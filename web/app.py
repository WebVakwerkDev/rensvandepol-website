import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

import httpx
from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client  # streamable-http client :contentReference[oaicite:2]{index=2}

MCP_URL = os.getenv("MCP_URL", "").strip()
MCP_BEARER_TOKEN = os.getenv("MCP_BEARER_TOKEN", "").strip()
ALLOW_ORIGIN = os.getenv("ALLOW_ORIGIN", "").strip()

if not MCP_URL:
    raise RuntimeError("MCP_URL is required (e.g. https://mcp.yourdomain.tld/mcp)")

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")


def _check_origin(req: Request) -> None:
    """Lightweight guardrail: only allow certain Origin for mutation endpoints."""
    if not ALLOW_ORIGIN:
        return
    origin = req.headers.get("origin", "")
    if origin != ALLOW_ORIGIN:
        raise HTTPException(status_code=403, detail="Origin not allowed")


def _mcp_headers() -> dict:
    if not MCP_BEARER_TOKEN:
        return {}
    return {"Authorization": f"Bearer {MCP_BEARER_TOKEN}"}


async def call_tool(tool_name: str, args: dict):
    """
    Connect to remote MCP server via Streamable HTTP and call a tool.
    """
    headers = _mcp_headers()

    # httpx client is injected so we can pass headers, timeouts, etc.
    async with httpx.AsyncClient(headers=headers, timeout=15.0) as http_client:
        async with streamablehttp_client(MCP_URL, http_client=http_client) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                result = await session.call_tool(tool_name, args)
                # result.content is typically a list of content blocks; we’ll normalize to text/json-ish
                return result


@app.get("/")
async def root():
    return FileResponse("static/index.html")


@app.get("/api/color")
async def get_color():
    # Expect your MCP server to expose a tool named "get_color"
    res = await call_tool("get_color", {})
    # Try to return the first text block as JSON if possible.
    if not res.content:
        return {"color": "#000000"}

    block = res.content[0]
    # Many servers return {"type":"text","text":"{...json...}"}
    text = getattr(block, "text", None) or (block.get("text") if isinstance(block, dict) else None)
    if not text:
        return {"color": "#000000"}

    # best effort parse
    import json
    try:
        obj = json.loads(text)
        return obj
    except Exception:
        return {"color": text}


@app.post("/api/color")
async def set_color(req: Request):
    _check_origin(req)

    body = await req.json()
    color = (body.get("color") or "").strip()
    if not color:
        raise HTTPException(status_code=400, detail="Missing color")

    # Expect your MCP server to expose a tool named "set_color" with arg "color"
    res = await call_tool("set_color", {"color": color})

    if not res.content:
        return {"ok": True, "color": color}

    block = res.content[0]
    text = getattr(block, "text", None) or (block.get("text") if isinstance(block, dict) else None)

    import json
    if text:
        try:
            return json.loads(text)
        except Exception:
            return {"result": text}

    return {"ok": True, "color": color}

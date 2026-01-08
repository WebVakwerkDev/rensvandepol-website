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
    async with streamablehttp_client(MCP_URL) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            return await session.call_tool(tool_name, args)

@app.get("/")
async def root():
    return FileResponse("static/index.html")


@app.get("/api/color")
async def get_color():
    try:
        res = await call_tool("get_color", {})
    except Exception as e:
        return {"error": str(e), "color": "#000000"}

    if not res.content:
        return {"color": "#000000"}

    block = res.content[0]
    text = getattr(block, "text", None) or (block.get("text") if isinstance(block, dict) else None)
    if not text:
        return {"color": "#000000"}

    import json
    try:
        return json.loads(text)
    except Exception:
        return {"color": text}


@app.post("/api/color")
async def set_color(req: Request):
    _check_origin(req)

    body = await req.json()
    color = (body.get("color") or "").strip()
    if not color:
        raise HTTPException(status_code=400, detail="Missing color")

    try:
        res = await call_tool("set_color", {"color": color})
    except Exception as e:
        return {"ok": False, "error": str(e)}

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

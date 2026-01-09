# MCP Color Control System

Een AI-gestuurde kleurweergave systeem waarbij je via ChatGPT of andere AI clients de kleur van een webpagina kunt aansturen via het Model Context Protocol (MCP).

## Overzicht

Dit systeem bestaat uit twee componenten die draaien in Docker:
1. **MCP Server** - Backend server die kleuren beheert via MCP endpoints (poort 3000)
2. **Web App** - Real-time kleurweergave pagina (poort 8080)

Je bestaande Cloudflare Tunnel kan je configureren om deze services publiek beschikbaar te maken.

## Features

- Real-time kleurwijzigingen via AI
- 15+ verschillende kleuren (rood, blauw, groen, geel, etc.)
- Automatische tekst contrast aanpassing
- Smooth animaties en transitions
- Persistente state (kleur blijft behouden na restart)
- Complete Docker setup
- Klaar voor Cloudflare Tunnel

## Installatie

### 1. Start de applicatie

```bash
docker-compose up -d --build
```

### 2. Controleer of alles werkt

```bash
# Check of containers draaien
docker-compose ps

# Check logs
docker-compose logs -f

# Test endpoints
curl http://localhost:3000/health
curl http://localhost:3000/api/color
```

De webapp is nu bereikbaar op `http://localhost:8080` en de MCP API op `http://localhost:3000`.

### 3. Configureer je Cloudflare Tunnel

Voeg de volgende routes toe aan je bestaande Cloudflare Tunnel configuratie:

**Route 1: Webapp**
- Public Hostname: `color.jouwdomein.nl` (of een andere subdomain)
- Service Type: `HTTP`
- URL: `localhost:8080` (of `ip-van-docker-host:8080`)

**Route 2: MCP API**
- Public Hostname: `mcp.jouwdomein.nl` (of een andere subdomain)
- Service Type: `HTTP`
- URL: `localhost:3000` (of `ip-van-docker-host:3000`)

## Gebruik met ChatGPT

### Optie 1: Via Custom GPT Actions

1. Maak een Custom GPT in ChatGPT
2. Voeg een Action toe met deze OpenAPI specificatie:

```yaml
openapi: 3.0.0
info:
  title: MCP Color Control API
  version: 1.0.0
  description: API om de kleur van een webpagina te besturen
servers:
  - url: https://mcp.jouwdomein.nl
    description: Production server
paths:
  /api/color:
    get:
      summary: Huidige kleur ophalen
      operationId: getCurrentColor
      responses:
        '200':
          description: Huidige kleur informatie
          content:
            application/json:
              schema:
                type: object
                properties:
                  color:
                    type: string
                    example: blue
                  hex:
                    type: string
                    example: "#0000FF"
                  name:
                    type: string
                    example: blauw
  /api/color/change:
    post:
      summary: Kleur van de webpagina veranderen
      operationId: changeColor
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                color:
                  type: string
                  description: Naam van de kleur
                  enum: [rood, red, blauw, blue, groen, green, geel, yellow, paars, purple, oranje, orange, roze, pink, zwart, black, wit, white, grijs, gray, grey, cyaan, cyan, magenta, bruin, brown]
              required:
                - color
      responses:
        '200':
          description: Kleur succesvol veranderd
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  message:
                    type: string
                  color:
                    type: object
```

3. Voeg instructies toe aan je GPT:
```
Je kunt de kleur van de webpagina op color.jouwdomein.nl aanpassen.
Gebruik de changeColor actie om de kleur te veranderen.
Gebruik getCurrentColor om de huidige kleur op te vragen.
```

4. Test met prompts zoals:
   - "Verander de kleur naar rood"
   - "Maak het groen"
   - "Wat is de huidige kleur?"

### Optie 2: Direct API gebruik

```bash
# Huidige kleur ophalen
curl https://mcp.jouwdomein.nl/api/color

# Kleur veranderen naar rood
curl -X POST https://mcp.jouwdomein.nl/api/color/change \
  -H "Content-Type: application/json" \
  -d '{"color": "rood"}'
```

### Optie 3: Via MCP Execute endpoint

Voor volledige MCP tool compatibiliteit:

```bash
# Lijst beschikbare tools
curl https://mcp.jouwdomein.nl/api/mcp/tools

# Execute tool
curl -X POST https://mcp.jouwdomein.nl/api/mcp/execute \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "change_color",
    "arguments": {
      "color": "blauw"
    }
  }'
```

## Beschikbare Kleuren

- rood / red
- blauw / blue
- groen / green
- geel / yellow
- paars / purple
- oranje / orange
- roze / pink
- zwart / black
- wit / white
- grijs / gray / grey
- cyaan / cyan
- magenta
- bruin / brown

## Project Structuur

```
.
├── docker-compose.yml          # Docker Compose configuratie
├── README.md                   # Deze documentatie
│
├── mcp-server/                # MCP Backend
│   ├── Dockerfile
│   ├── package.json
│   └── server.js              # Express server met MCP endpoints
│
└── webapp/                    # Frontend
    ├── Dockerfile
    ├── nginx.conf             # Nginx configuratie
    └── index.html             # Kleur weergave pagina
```

## API Endpoints

### MCP Server (poort 3000)

- `GET /` - Server info en beschikbare endpoints
- `GET /health` - Health check
- `GET /api/color` - Huidige kleur ophalen
- `POST /api/color/change` - Kleur veranderen (body: `{color: "rood"}`)
- `GET /api/mcp/tools` - Lijst van beschikbare MCP tools
- `POST /api/mcp/execute` - MCP tool uitvoeren

### Web App (poort 8080)

- `/` - Kleur weergave pagina
- `/api/*` - Proxied naar MCP server
- `/health` - Health check (proxied)

# MCP Kleur Controller

Een interactieve applicatie waarbij een AI de kleur van de webpagina kan aanpassen via het **Model Context Protocol (MCP)**. Dit project bestaat uit een frontend die de kleur toont en een backend die fungeert als MCP-server.

## 🔗 Live URL's

- **Web Interface (Frontend):** [http://color.stijnvandepol.nl](http://color.stijnvandepol.nl)
- **MCP Server Endpoint (SSE):** `http://mcp.stijnvandepol.nl/sse`
- **HTTP API:** `http://mcp.stijnvandepol.nl/api/color`

## 🤖 Verbinden met AI

### Via MCP (Claude Desktop, Cursor, etc.)
Om een AI-agent te laten verbinden met deze server, gebruik je de volgende configuratie:

- **Type:** SSE (Server-Sent Events) / Remote
- **URL:** `http://mcp.stijnvandepol.nl/sse`

De AI krijgt hiermee toegang tot de volgende tools:
1. `change_color`: Verandert de achtergrondkleur (bijv. "red", "#00FF00").
2. `get_current_color`: Vraagt de huidige kleur op.

### Via ChatGPT (Custom GPT)
*Let op: ChatGPT ondersteunt native nog geen MCP. Als je een Custom GPT wilt gebruiken, heb je een OpenAPI specificatie nodig voor de HTTP API, of een tussenlaag (bridge) die MCP vertaalt.*

## 🛠️ Installatie & Lokaal Draaien

Dit project gebruikt Docker Compose.

1. **Clone de repository**
2. **Start de containers:**
   ```bash
   docker-compose up --build -d
   ```

### Architectuur
* **Frontend (Port 8080):** Nginx server die een statische HTML pagina serveert. Deze pollt elke seconde de backend voor updates.
* **Backend (Port 3000):** Node.js applicatie met Express.
  * Serveert HTTP API endpoints (`/api/color`).
  * Serveert MCP via SSE (`/sse`) en Stdio.
  * Slaat de state op in een volume (`color-data`).

## 📡 API Endpoints

- **GET** `/api/color`: Krijg huidige JSON status.
- **POST** `/api/color`: Update kleur (Body: `{ "color": "blue" }`).
- **GET** `/sse`: Endpoint voor MCP verbindingen.
- **POST** `/messages`: Message handler voor MCP sessies.

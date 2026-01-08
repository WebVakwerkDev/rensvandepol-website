import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

// State management - huidige kleur opslaan
const STATE_FILE = '/app/data/color.json';
let currentColor = 'blue';

// Laad opgeslagen kleur bij startup
function loadColor() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      currentColor = data.color || 'blue';
    }
  } catch (err) {
    console.log('Geen opgeslagen kleur gevonden, start met blauw');
  }
}

// Sla kleur op
function saveColor(color) {
  try {
    const dir = path.dirname(STATE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify({ color }));
    currentColor = color;
  } catch (err) {
    console.error('Fout bij opslaan kleur:', err);
  }
}

loadColor();

// MCP Server setup
const server = new Server(
  {
    name: "color-controller",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool registratie
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "change_color",
        description: "Verander de kleur van de webpagina. Ondersteunt alle CSS kleurnamen en hex codes.",
        inputSchema: {
          type: "object",
          properties: {
            color: {
              type: "string",
              description: "De nieuwe kleur (bijv. 'red', 'blue', '#FF5733')",
            },
          },
          required: ["color"],
        },
      },
      {
        name: "get_current_color",
        description: "Haal de huidige kleur van de webpagina op",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "change_color") {
    const color = request.params.arguments.color;
    saveColor(color);
    return {
      content: [
        {
          type: "text",
          text: `Kleur succesvol veranderd naar: ${color}`,
        },
      ],
    };
  } else if (request.params.name === "get_current_color") {
    return {
      content: [
        {
          type: "text",
          text: `Huidige kleur: ${currentColor}`,
        },
      ],
    };
  }
  
  throw new Error(`Onbekende tool: ${request.params.name}`);
});

// Start MCP server via stdio
async function startMCPServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP Color Controller Server draait op stdio");
}

// HTTP API voor frontend
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/color', (req, res) => {
  res.json({ color: currentColor });
});

app.post('/api/color', (req, res) => {
  const { color } = req.body;
  if (!color) {
    return res.status(400).json({ error: 'Kleur is verplicht' });
  }
  saveColor(color);
  res.json({ color: currentColor });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP API draait op poort ${PORT}`);
});

// Start MCP server (alleen als via stdio aangeroepen)
if (process.env.MCP_MODE === 'stdio') {
  startMCPServer().catch(console.error);
}
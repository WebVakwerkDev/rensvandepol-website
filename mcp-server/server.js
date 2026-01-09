import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const app = express();
const PORT = 3000;

// State file voor het opslaan van de huidige kleur
const STATE_FILE = '/app/state/color.json';

// Zorg dat state directory bestaat
const stateDir = path.dirname(STATE_FILE);
if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
}

// Initiële kleur
let currentColor = { color: 'blue', hex: '#0000FF', name: 'blauw' };

// Laad state bij opstarten
if (fs.existsSync(STATE_FILE)) {
    try {
        currentColor = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        console.error('Loaded color state:', currentColor);
    } catch (e) {
        console.error('Error loading state:', e);
    }
}

// Sla state op
function saveState() {
    fs.writeFileSync(STATE_FILE, JSON.stringify(currentColor, null, 2));
}

app.use(cors());
app.use(express.json());

// Kleur mapping
const colorMap = {
    'rood': { color: 'red', hex: '#FF0000', name: 'rood' },
    'red': { color: 'red', hex: '#FF0000', name: 'rood' },
    'blauw': { color: 'blue', hex: '#0000FF', name: 'blauw' },
    'blue': { color: 'blue', hex: '#0000FF', name: 'blauw' },
    'groen': { color: 'green', hex: '#00FF00', name: 'groen' },
    'green': { color: 'green', hex: '#00FF00', name: 'groen' },
    'geel': { color: 'yellow', hex: '#FFFF00', name: 'geel' },
    'yellow': { color: 'yellow', hex: '#FFFF00', name: 'geel' },
    'paars': { color: 'purple', hex: '#800080', name: 'paars' },
    'purple': { color: 'purple', hex: '#800080', name: 'paars' },
    'oranje': { color: 'orange', hex: '#FFA500', name: 'oranje' },
    'orange': { color: 'orange', hex: '#FFA500', name: 'oranje' },
    'roze': { color: 'pink', hex: '#FFC0CB', name: 'roze' },
    'pink': { color: 'pink', hex: '#FFC0CB', name: 'roze' },
    'zwart': { color: 'black', hex: '#000000', name: 'zwart' },
    'black': { color: 'black', hex: '#000000', name: 'zwart' },
    'wit': { color: 'white', hex: '#FFFFFF', name: 'wit' },
    'white': { color: 'white', hex: '#FFFFFF', name: 'wit' },
    'grijs': { color: 'gray', hex: '#808080', name: 'grijs' },
    'gray': { color: 'gray', hex: '#808080', name: 'grijs' },
    'grey': { color: 'gray', hex: '#808080', name: 'grijs' },
    'cyaan': { color: 'cyan', hex: '#00FFFF', name: 'cyaan' },
    'cyan': { color: 'cyan', hex: '#00FFFF', name: 'cyaan' },
    'magenta': { color: 'magenta', hex: '#FF00FF', name: 'magenta' },
    'bruin': { color: 'brown', hex: '#8B4513', name: 'bruin' },
    'brown': { color: 'brown', hex: '#8B4513', name: 'bruin' }
};

// Create MCP Server instance
const mcpServer = new Server(
    {
        name: 'color-control-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Register MCP tool handlers
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'change_color',
                description: 'Verander de kleur van de webpagina naar een specifieke kleur. Beschikbare kleuren: rood, blauw, groen, geel, paars, oranje, roze, zwart, wit, grijs, cyaan, magenta, bruin',
                inputSchema: {
                    type: 'object',
                    properties: {
                        color: {
                            type: 'string',
                            description: 'De naam van de kleur (Nederlands of Engels)',
                        }
                    },
                    required: ['color']
                }
            },
            {
                name: 'get_current_color',
                description: 'Krijg de huidige kleur van de webpagina',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            }
        ]
    };
});

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        if (name === 'change_color') {
            if (!args || !args.color) {
                throw new Error('Color parameter is required');
            }

            const colorKey = args.color.toLowerCase().trim();
            const newColor = colorMap[colorKey];

            if (!newColor) {
                const availableColors = Object.keys(colorMap).filter((_, i) => i % 2 === 0);
                throw new Error(`Onbekende kleur: ${args.color}. Beschikbare kleuren: ${availableColors.join(', ')}`);
            }

            currentColor = newColor;
            saveState();

            console.error(`[MCP] Color changed to: ${currentColor.name} (${currentColor.hex})`);

            return {
                content: [
                    {
                        type: 'text',
                        text: `✅ Kleur succesvol veranderd naar ${currentColor.name} (${currentColor.hex}). Bekijk het resultaat op de webpagina!`
                    }
                ]
            };
        }

        if (name === 'get_current_color') {
            return {
                content: [
                    {
                        type: 'text',
                        text: `De huidige kleur is ${currentColor.name} (${currentColor.hex})`
                    }
                ]
            };
        }

        throw new Error(`Unknown tool: ${name}`);
    } catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`
                }
            ],
            isError: true
        };
    }
});

// MCP SSE endpoint
app.get('/sse', async (req, res) => {
    console.error('[MCP] New SSE connection established');

    const transport = new SSEServerTransport('/message', res);
    await mcpServer.connect(transport);

    // Keep connection alive
    res.on('close', () => {
        console.error('[MCP] SSE connection closed');
    });
});

// MCP message handler
app.post('/message', async (req, res) => {
    console.error('[MCP] Received message:', JSON.stringify(req.body).substring(0, 200));
    // SSE transport handles the message
    res.status(200).end();
});

// Legacy REST API endpoints (backwards compatibility)

// 1. Get current color
app.get('/api/color', (req, res) => {
    res.json(currentColor);
});

// 2. Change color - REST API endpoint
app.post('/api/color/change', (req, res) => {
    const { color } = req.body;

    if (!color) {
        return res.status(400).json({
            error: 'Color parameter is required',
            example: { color: 'rood' }
        });
    }

    const colorKey = color.toLowerCase().trim();
    const newColor = colorMap[colorKey];

    if (!newColor) {
        return res.status(400).json({
            error: `Onbekende kleur: ${color}`,
            availableColors: Object.keys(colorMap).filter((_, i) => i % 2 === 0)
        });
    }

    currentColor = newColor;
    saveState();

    console.error(`Color changed to: ${currentColor.name} (${currentColor.hex})`);

    res.json({
        success: true,
        message: `Kleur veranderd naar ${currentColor.name}`,
        color: currentColor
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', color: currentColor.name });
});

// Info endpoint
app.get('/', (req, res) => {
    res.json({
        service: 'MCP Color Server',
        version: '1.0.0',
        currentColor: currentColor,
        mcp: {
            'SSE endpoint': 'GET /sse',
            'Message handler': 'POST /message'
        },
        endpoints: {
            'GET /api/color': 'Get current color',
            'POST /api/color/change': 'Change color (body: {color: "rood"})',
            'GET /health': 'Health check'
        },
        usage: {
            chatgpt: 'Connect ChatGPT to https://your-domain.com/sse',
            description: 'Gebruik tools: change_color en get_current_color'
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.error(`MCP Color Server running on port ${PORT}`);
    console.error(`Current color: ${currentColor.name} (${currentColor.hex})`);
    console.error(`MCP SSE endpoint: http://localhost:${PORT}/sse`);
});

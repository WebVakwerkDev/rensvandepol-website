import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

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
        console.log('Loaded color state:', currentColor);
    } catch (e) {
        console.error('Error loading state:', e);
    }
}

// Sla state op
function saveState() {
    fs.writeFileSync(STATE_FILE, JSON.stringify(currentColor, null, 2));
}

// CORS configuratie - belangrijk voor ChatGPT
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));

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

// ============================================
// MCP HTTP ENDPOINTS (voor ChatGPT)
// ============================================

// GET /.well-known/mcp - MCP Discovery endpoint
app.get('/.well-known/mcp', (req, res) => {
    res.json({
        "protocol_version": "1.0",
        "server_info": {
            "name": "color-control-server",
            "version": "1.0.0",
            "description": "MCP server voor het besturen van webpagina kleuren via AI"
        },
        "capabilities": {
            "tools": true
        },
        "endpoints": {
            "tools": "/mcp/tools",
            "call_tool": "/mcp/call"
        }
    });
});

// GET /mcp/tools - List available tools
app.get('/mcp/tools', (req, res) => {
    res.json({
        "tools": [
            {
                "name": "change_color",
                "description": "Verander de kleur van de webpagina naar een specifieke kleur. Beschikbare kleuren: rood, blauw, groen, geel, paars, oranje, roze, zwart, wit, grijs, cyaan, magenta, bruin (of Engels equivalent)",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "color": {
                            "type": "string",
                            "description": "De naam van de kleur (Nederlands of Engels)"
                        }
                    },
                    "required": ["color"]
                }
            },
            {
                "name": "get_current_color",
                "description": "Krijg de huidige kleur van de webpagina",
                "inputSchema": {
                    "type": "object",
                    "properties": {}
                }
            }
        ]
    });
});

// POST /mcp/call - Call a tool
app.post('/mcp/call', (req, res) => {
    const { name, arguments: args } = req.body;

    console.log(`[MCP] Tool called: ${name}`, args);

    try {
        if (name === 'change_color') {
            if (!args || !args.color) {
                return res.status(400).json({
                    "error": "Color parameter is required"
                });
            }

            const colorKey = args.color.toLowerCase().trim();
            const newColor = colorMap[colorKey];

            if (!newColor) {
                const availableColors = Object.keys(colorMap).filter((_, i) => i % 2 === 0);
                return res.status(400).json({
                    "error": `Onbekende kleur: ${args.color}`,
                    "available_colors": availableColors
                });
            }

            currentColor = newColor;
            saveState();

            console.log(`[MCP] Color changed to: ${currentColor.name} (${currentColor.hex})`);

            return res.json({
                "success": true,
                "result": `✅ Kleur succesvol veranderd naar ${currentColor.name} (${currentColor.hex}). De webpagina toont nu deze kleur!`,
                "color": currentColor
            });
        }

        if (name === 'get_current_color') {
            return res.json({
                "success": true,
                "result": `De huidige kleur is ${currentColor.name} (${currentColor.hex})`,
                "color": currentColor
            });
        }

        return res.status(404).json({
            "error": `Unknown tool: ${name}`
        });

    } catch (error) {
        console.error('[MCP] Error:', error);
        return res.status(500).json({
            "error": error.message
        });
    }
});

// ============================================
// LEGACY REST API ENDPOINTS
// ============================================

// GET /api/color - Huidige kleur ophalen
app.get('/api/color', (req, res) => {
    res.json(currentColor);
});

// POST /api/color/change - Kleur veranderen
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

    console.log(`[API] Color changed to: ${currentColor.name} (${currentColor.hex})`);

    res.json({
        success: true,
        message: `Kleur veranderd naar ${currentColor.name}`,
        color: currentColor
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        color: currentColor.name,
        mcp: 'enabled'
    });
});

// Root endpoint - Server info
app.get('/', (req, res) => {
    res.json({
        service: 'MCP Color Server',
        version: '1.0.0',
        protocol: 'HTTP MCP',
        currentColor: currentColor,
        mcp: {
            discovery: '/.well-known/mcp',
            tools: '/mcp/tools',
            call: '/mcp/call'
        },
        legacy_api: {
            'GET /api/color': 'Get current color',
            'POST /api/color/change': 'Change color'
        },
        usage: {
            chatgpt: 'Connect ChatGPT to https://mcp.stijnvandepol.nl',
            description: 'Use tools: change_color and get_current_color'
        }
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`MCP Color Server running on port ${PORT}`);
    console.log(`Current color: ${currentColor.name} (${currentColor.hex})`);
    console.log(`MCP Discovery: http://localhost:${PORT}/.well-known/mcp`);
    console.log(`MCP Tools: http://localhost:${PORT}/mcp/tools`);
    console.log(`MCP Call: http://localhost:${PORT}/mcp/call`);
});

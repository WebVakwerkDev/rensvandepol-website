# ChatGPT MCP Setup Guide

## Wat is MCP?

Model Context Protocol (MCP) is een standaard protocol waarmee AI assistenten zoals ChatGPT direct kunnen communiceren met externe services en tools.

## Je MCP Server URL

Na het deployen van deze applicatie, is je MCP server bereikbaar via:

```
https://mcp.jouwdomein.nl/sse
```

(Vervang `mcp.jouwdomein.nl` met je echte domein dat je hebt geconfigureerd in Cloudflare Tunnel)

## ChatGPT Configureren

### Stap 1: Ga naar ChatGPT

Open [ChatGPT](https://chat.openai.com)

### Stap 2: Open instellingen

1. Klik op je profielfoto (rechts onderaan)
2. Kies **Settings**
3. Ga naar **Integrations** of **Beta features** (kan verschillen per account)

### Stap 3: Voeg MCP Server toe

1. Zoek naar **"Model Context Protocol"** of **"MCP Servers"**
2. Klik op **"Add MCP Server"** of **"Connect"**
3. Plak je MCP URL: `https://mcp.jouwdomein.nl/sse`
4. Klik op **"Connect"** of **"Add"**

### Stap 4: Verificeer de verbinding

ChatGPT zal automatisch verbinden met je server en de beschikbare tools ontdekken:
- `change_color` - Verander de kleur van de webpagina
- `get_current_color` - Vraag de huidige kleur op

## Gebruik

Na het configureren kun je gewoon tegen ChatGPT praten:

### Voorbeelden:

- "Verander de kleur naar rood"
- "Maak de webpagina groen"
- "Wat is de huidige kleur?"
- "Zet de kleur op paars"
- "Laat me geel zien"

ChatGPT zal automatisch de juiste tools gebruiken om je verzoek uit te voeren!

## Beschikbare kleuren

- rood / red
- blauw / blue
- groen / green
- geel / yellow
- paars / purple
- oranje / orange
- roze / pink
- zwart / black
- wit / white
- grijs / gray
- cyaan / cyan
- magenta
- bruin / brown

## Het resultaat bekijken

Open in je browser:
```
https://color.jouwdomein.nl
```

Je ziet de webpagina met de gekozen kleur in realtime veranderen!

## Troubleshooting

### ChatGPT kan niet verbinden

1. **Controleer of je MCP server draait:**
   ```bash
   curl https://mcp.jouwdomein.nl/health
   ```
   Dit zou `{"status":"ok","color":"..."}` moeten teruggeven

2. **Controleer de SSE endpoint:**
   ```bash
   curl https://mcp.jouwdomein.nl/sse
   ```

3. **Controleer CORS en HTTPS:**
   - MCP vereist HTTPS (Cloudflare Tunnel doet dit automatisch)
   - CORS headers moeten correct zijn ingesteld (zit al in de code)

### ChatGPT vindt geen tools

Als ChatGPT verbinding maakt maar geen tools ziet:

1. Check of de server de juiste tool definitions returned:
   ```bash
   curl https://mcp.jouwdomein.nl/
   ```

2. Herstart de verbinding in ChatGPT:
   - Verwijder de MCP server
   - Voeg hem opnieuw toe

### Kleur verandert niet

Als ChatGPT de tool gebruikt maar de kleur verandert niet:

1. Check of de webapp draait:
   ```bash
   curl https://color.jouwdomein.nl
   ```

2. Check de MCP server logs:
   ```bash
   docker-compose logs -f mcp-server
   ```

3. Open de webapp in je browser en check de browser console voor errors

## Alternatief: Test met MCP Inspector

Je kunt je server ook testen met de officiële MCP Inspector tool voordat je ChatGPT configureert:

```bash
npx @modelcontextprotocol/inspector https://mcp.jouwdomein.nl/sse
```

Dit geeft je een UI om te testen of je MCP server correct werkt.

## Beveiliging

Momenteel is je MCP server publiek toegankelijk zonder authenticatie. Voor productie gebruik overweeg:

1. **Cloudflare Access** - Voeg authenticatie toe via Cloudflare
2. **API Keys** - Implementeer API key authenticatie
3. **Rate Limiting** - Configureer rate limiting in Cloudflare
4. **IP Whitelisting** - Beperk toegang tot specifieke IP's

## Meer informatie

- [MCP Documentation](https://modelcontextprotocol.io)
- [ChatGPT MCP Guide](https://help.openai.com/en/articles/mcp)
- [MCP GitHub](https://github.com/modelcontextprotocol)

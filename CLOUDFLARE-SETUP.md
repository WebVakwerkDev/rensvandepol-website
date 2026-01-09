# Cloudflare Tunnel Setup Guide

Deze guide helpt je om je MCP Color Control System publiek toegankelijk te maken via je bestaande Cloudflare Tunnel.

## Vereisten

- Een actieve Cloudflare Tunnel die draait op je Proxmox machine
- Docker containers draaien op dezelfde machine of een andere machine in je netwerk
- Een domein verbonden aan Cloudflare

## Stap 1: Identificeer je Docker host

Als de Docker containers op **dezelfde machine** draaien als je Cloudflare Tunnel:
- Gebruik `localhost:3000` en `localhost:8080`

Als de Docker containers op een **andere machine** draaien (bijv. andere Proxmox VM):
- Gebruik het IP-adres van die machine: bijv. `192.168.1.100:3000` en `192.168.1.100:8080`

## Stap 2: Configureer Cloudflare Tunnel Routes

### Via Cloudflare Zero Trust Dashboard

1. Log in op [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/)
2. Navigeer naar **Networks > Tunnels**
3. Klik op je bestaande tunnel
4. Ga naar het **Public Hostname** tabblad
5. Klik op **Add a public hostname**

### Route 1: Web Interface

Configureer de webapp (kleurweergave):

- **Subdomain**: `color` (of een andere naam naar keuze)
- **Domain**: Selecteer je domein (bijv. `stijnvandepol.nl`)
- **Type**: `HTTP`
- **URL**: `localhost:8080` (of `192.168.1.x:8080` als op andere machine)

Resultaat: `https://color.jouwdomein.nl` toont de kleurweergave

### Route 2: MCP API

Configureer de MCP API:

- **Subdomain**: `mcp` of `mcp-api`
- **Domain**: Selecteer je domein (bijv. `stijnvandepol.nl`)
- **Type**: `HTTP`
- **URL**: `localhost:3000` (of `192.168.1.x:3000` als op andere machine)

Resultaat: `https://mcp.jouwdomein.nl` is je MCP API endpoint

## Stap 3: Test de configuratie

### Test de webapp

Open in je browser:
```
https://color.jouwdomein.nl
```

Je zou een pagina moeten zien met een kleur (standaard blauw).

### Test de MCP API

Test met curl of Postman:

```bash
# Health check
curl https://mcp.jouwdomein.nl/health

# Huidige kleur
curl https://mcp.jouwdomein.nl/api/color

# Kleur veranderen
curl -X POST https://mcp.jouwdomein.nl/api/color/change \
  -H "Content-Type: application/json" \
  -d '{"color": "rood"}'
```

Als je nu naar je webapp kijkt, zou de kleur binnen 500ms moeten veranderen naar rood.

## Stap 4: Koppel ChatGPT

Nu je MCP API publiek toegankelijk is, kun je deze koppelen aan ChatGPT:

### Custom GPT maken

1. Ga naar ChatGPT
2. Klik op je naam > **My GPTs** > **Create a GPT**
3. Geef je GPT een naam zoals "Color Controller"
4. Voeg een beschrijving toe
5. Ga naar **Configure** > **Actions** > **Create new action**
6. Importeer de OpenAPI spec uit de README.md
7. Vervang `https://mcp.jouwdomein.nl` met je echte domein
8. Sla op en test

### Test prompts

Probeer deze prompts in je Custom GPT:

- "Wat is de huidige kleur?"
- "Verander de kleur naar groen"
- "Maak het paars"
- "Zet op rood"

## Troubleshooting

### 502 Bad Gateway

- Check of je Docker containers draaien: `docker-compose ps`
- Check of de poorten correct zijn: `netstat -tulpn | grep -E '3000|8080'`
- Check logs: `docker-compose logs -f`

### Tunnel kan services niet bereiken

- Als Docker op andere machine draait, check firewall regels
- Test lokaal eerst: `curl http://localhost:3000/health`
- Check of IP-adres correct is in tunnel configuratie

### Webapp laadt maar API werkt niet

- Check of beide routes in Cloudflare Tunnel zijn geconfigureerd
- De webapp proxied API calls naar de MCP server via nginx
- Check nginx logs: `docker-compose logs webapp`

### CORS errors

Als je direct API calls doet vanuit een andere website, kan je CORS errors krijgen. De server heeft al CORS enabled, maar je kunt Cloudflare ook configureren om CORS headers toe te voegen.

## Beveiliging

### Aanbevolen stappen voor productie:

1. **Voeg authenticatie toe** - Gebruik Cloudflare Access om een login te vereisen
2. **Rate limiting** - Configureer rate limiting in Cloudflare
3. **API Keys** - Voeg API key authenticatie toe aan de MCP server
4. **HTTPS only** - Cloudflare Tunnel gebruikt automatisch HTTPS

### Cloudflare Access configureren (optioneel)

Als je de API wilt beveiligen met login:

1. Ga naar **Access > Applications**
2. Klik op **Add an application**
3. Kies **Self-hosted**
4. Application domain: `mcp.jouwdomein.nl`
5. Configureer wie toegang heeft (email, groep, etc.)
6. Sla op

Nu moet je inloggen voordat je de API kunt gebruiken.

## Alternatieve configuratie: Eén domein

Als je maar één subdomain wilt gebruiken, kun je beide services op hetzelfde domein zetten:

**Optie A: Alles via de webapp**
- `https://color.jouwdomein.nl` → webapp:80
- API calls worden via nginx doorgestuurd naar mcp-server:3000
- Voor ChatGPT gebruik je `https://color.jouwdomein.nl/api/*`

**Optie B: Pad-gebaseerde routing in Cloudflare**
- `https://app.jouwdomein.nl` → webapp:80
- `https://app.jouwdomein.nl/api/*` → mcp-server:3000

## Monitoring

Je kunt de status van je services monitoren via:

- Webapp health: `https://color.jouwdomein.nl/health`
- MCP health: `https://mcp.jouwdomein.nl/health`

Beide zouden JSON moeten retourneren met status info.

## Support

Bij problemen, check:
1. Docker logs: `docker-compose logs -f`
2. Cloudflare Tunnel logs op je tunnel machine
3. Network connectivity tussen tunnel en Docker host

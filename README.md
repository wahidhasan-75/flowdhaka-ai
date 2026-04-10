# FlowDhaka AI

FlowDhaka AI is a deployable, premium UX prototype for the **Impact Dhaka** hackathon. It combines two software-first urban mobility products into one Vercel-ready Next.js application:

- **SmartStop AI** — a location-aware smart bus stop and passenger decision platform
- **RickshawFlow AI** — a CCTV-inspired stand safety, virtual signaling, and control-room intelligence system

The project is built around seeded Dhaka-style demo data and API-driven simulation so it can be presented immediately without external hardware or live CCTV infrastructure.

## Why this project fits the hackathon

- AI-powered digital product
- Practical urban mobility solution
- Modular startup-style system
- Demo-friendly and easy to present
- Deployable on Vercel without extra infrastructure

## Main routes

### Platform
- `/` — FlowDhaka AI landing page
- `/modules` — quick overview of the two modules

### SmartStop AI
- `/smartstop`
- `/smartstop/display/shahbagh`
- `/smartstop/display/farmgate`
- `/smartstop/display/uttara`
- `/smartstop/display/katabon`
- `/smartstop/app`
- `/smartstop/compare`
- `/smartstop/recommendation`
- `/smartstop/operator`
- `/smartstop/admin`
- `/smartstop/impact`

### RickshawFlow AI
- `/rickshawflow`
- `/rickshawflow/virtual-stand-display`
- `/rickshawflow/control-room`

## Tech stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- Zod
- Seeded local data + API route simulation

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Environment variables

Create `.env.local` from `.env.example`

```bash
cp .env.example .env.local
```

Current variables:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_DEMO_MODE`

## Deployment to Vercel

1. Push this folder to a new GitHub repository.
2. Import the repository into Vercel.
3. Framework preset: **Next.js**.
4. Add environment variables from `.env.example`.
5. Deploy.

No custom server is required.

## Demo flow

### SmartStop AI
1. Open `/smartstop`
2. Show the location-aware logic
3. Open `/smartstop/display/shahbagh`
4. Show that the board only shows buses for Shahbagh
5. Open `/smartstop/app` and switch user location
6. Show recommendation change by nearby stop
7. Open `/smartstop/operator`
8. Open `/smartstop/admin` to show admin-only enforcement intelligence

### RickshawFlow AI
1. Open `/rickshawflow`
2. Show the two separate entry cards
3. Open `/rickshawflow/virtual-stand-display`
4. Change scenario from normal to peak or rain
5. Open `/rickshawflow/control-room`
6. Show risk score, alert feed, CCTV preview, and intervention support
7. Click **Apply Intervention**
8. Show the stand status improve

## Project structure

```text
app/
  api/
  modules/
  rickshawflow/
  smartstop/
components/
  charts/
  layout/
hooks/
lib/
public/
```

## Future integrations

This project is intentionally built so real data can be plugged in later:

- GTFS or operator route feeds
- real ETA services
- transport authority dashboards
- real CCTV inference APIs
- report export pipelines
- authentication and role-based sessions

## Common fixes

### Port already in use
```bash
npx kill-port 3000
npm run dev
```

### Styling not updating
```bash
rm -rf .next
npm run dev
```

### Vercel route issue
Make sure the project is deployed as a standard Next.js app and not as a static export.

## Pitch summary

FlowDhaka AI is a software-first urban mobility intelligence platform for Dhaka. SmartStop AI improves stop-level public transport decision support, while RickshawFlow AI helps authorities detect overload, assign virtual stand signals, and act earlier in high-chaos roadside zones.

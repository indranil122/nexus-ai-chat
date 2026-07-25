# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NexusAI Chat is a **100% client-side, zero-server** AI workbench. Everything runs in the browser — API key storage (AES-256 via Web Crypto), model discovery, SSE streaming, and the live canvas artifact renderer. No backend, no telemetry, no database.

## Key Commands

- `npm install` — installs anime.js dependency
- `npm run dev` — starts a static server on port 3000 with SPA fallback (`npx serve -s -l 3000`)
- Open `index.html` directly or serve via any static file server

## Architecture

### Module Structure (ES6 native modules — no bundler)

```
index.html          → Single-page app with landing + chat workspace
styles.css          → Full design system (~3400 lines, CSS custom properties)
landing.css         → Landing page styles (uses same CSS variables)
js/app.js           → NexusApp — main orchestrator, wires all modules together
js/ui.js            → UIController — DOM bindings, event listeners, template rendering
js/providers.js     → ProviderService — model fetching/parsing from providers
js/stream.js        → StreamClient — SSE streaming for chat completions
js/storage.js       → StorageManager — localStorage with Web Crypto AES-256 encryption
js/artifacts.js     → ArtifactManager — code block extraction, live canvas preview
js/animations.js    → Animations — Anime.js wrappers for modals, toasts, typing indicator
js/changelog.js     → ChangelogManager — GitHub commits API integration
```

### Data Flow

1. User selects a **provider preset** (providers.js → base URL + API key)
2. Models are auto-fetched from the provider's `/v1/models` endpoint
3. Chat messages stream via SSE (`/v1/chat/completions`) through `StreamClient`
4. API keys encrypted via `StorageManager` (PBKDF2 + AES-256-GCM) in localStorage
5. Code blocks detected by `ArtifactManager` render as interactive HTML/SVG previews in the Canvas panel
6. `NexusApp` in `app.js` orchestrates all modules via callback wiring in `init()`

### Key Classes

| Class | File | Role |
|---|---|---|
| `NexusApp` | `app.js` | Bootstrap, state hub, wires callbacks between UI and services |
| `UIController` | `ui.js` | DOM refs, event binding, renders dropdowns/modals/sessions/messages |
| `ProviderService` | `providers.js` | Provider presets (OpenRouter, Groq, Ollama, etc.), model fetching with fallback |
| `StreamClient` | `stream.js` | SSE fetch with AbortController, streams chat completion chunks |
| `StorageManager` | `storage.js` | Encrypted localStorage, vault entries, settings, session persistence |
| `ArtifactManager` | `artifacts.js` | Extracts code blocks → artifact objects, builds sandboxed iframe previews |
| `Animations` | `animations.js` | Anime.js animation helpers (modals, messages, dropdowns, toasts) |
| `ChangelogManager` | `changelog.js` | Fetches GitHub commits, builds changelog timeline HTML |

### Supported Providers

Presets in `providers.js` — AIRouter, OpenRouter, NVIDIA NIM, Groq, Together AI, Fireworks, DeepInfra, Ollama, LM Studio, Custom. All use OpenAI-compatible `/v1/chat/completions` endpoint.

### Storage Architecture

- `localStorage` keys: `nexus_ai_settings`, `nexus_ai_sessions`, `nexus_ai_active_session`, `nexus_ai_privacy_dismissed`, `nexus_ai_theme`
- API keys encrypted with PBKDF2-derived AES-256-GCM key (100k iterations)
- Vault entries stored by preset ID for quick recall
- Optional session-only key (not persisted)

## Design System

**Color palette** — CSS custom properties in `:root` (`styles.css:7-57`):
- Canvas: `#faf9f5` (warm cream background)
- Primary Coral: `#cc785c` (CTAs, active states, accent)
- Surface Card: `#efe9de` (card backgrounds)
- Surface Dark: `#181715` (code blocks, modals, footer)
- Ink: `#141413` (headlines/body text)

**Typography** — Google Fonts loaded in `<head>`:
- Display: `'Cormorant Garamond', serif` (headlines, display text)
- Sans: `'Inter', sans-serif` (body, nav, UI labels)
- Mono: `'Fira Code', monospace` (code blocks)

**Key visual patterns:**
- Top nav bar: pill-shaped (`border-radius: 9999px`), glassmorphism (`backdrop-filter: blur(24px)`) with hairline border
- Primary buttons: coral `#cc785c` with red/orange box-shadow glow
- Cards: cream `#efe9de` or canvas with hairline borders, subtle shadows
- Dark surfaces: navy `#181715` for code windows, artifact cards, footer
- Focus states: coral border + `rgba(204, 120, 92, 0.15)` ring
- Border radius hierarchy: 4px (badges) → 8px (buttons/inputs) → 12px (cards) → 16px (modals) → 9999px (pills)
- Animations: Anime.js `cubic-bezier(0.16, 1, 0.3, 1)` easing ("easeOutExpo" feel) used throughout

## Project Structure Notes

- No bundler, no build step — plain HTML + ES6 modules with `type="module"` script tags
- `index.html` includes inline critical CSS and a pre-paint script to prevent flash on reload
- The landing page (`#landing-page`) and chat app (`#app`) co-exist; the landing fades out on launch
- Mobile: `height: 100dvh` throughout, scroll lock via `.app-mode` class, sidebar overlays absolutely
- Static image asset: `ChatGPT Image Jul 24, 2026, 10_52_42 AM.png` used as logo/favicon

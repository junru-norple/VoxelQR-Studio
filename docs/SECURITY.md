# Security and privacy

## Runtime privacy

- No API, analytics, telemetry, crash reporter, remote font, CDN, cloud database, or account.
- Entered payloads are kept in memory only and are never written to local storage.
- Local storage contains only language and theme preferences.
- Web build validation permits only its own static origin and recorded zero third-party requests.
- Single HTML and Windows validation recorded zero HTTP(S) requests.

## Browser policy

The page CSP denies network connections, objects, frames, and form submission. Scripts and styles are local; inline script/style is permitted only because the formal single HTML artifact inlines the Vite bundle. Images are limited to local/data/blob URLs for local export.

## Electron hardening

- `contextIsolation=true`
- `nodeIntegration=false`
- `sandbox=true`
- `webSecurity=true`
- no renderer IPC or context bridge capability
- all permission checks and requests denied
- popups denied
- non-file navigation denied
- runtime request protocol allowlist
- no arbitrary shell execution
- no external URL opening from the desktop renderer

## Dependency audit

`npm audit` returned zero known vulnerabilities after upgrading Electron to 43.4.1. Runtime libraries are MIT/ISC licensed. No native Node addon is included.

## Threat boundary

VoxelQR Studio encodes user-provided text. It does not browse or retrieve that content. A QR scanner may later interpret an encoded URL; users should apply the same caution they would to any QR destination.

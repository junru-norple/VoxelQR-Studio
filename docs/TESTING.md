# Testing and verification

## Development checks

```powershell
npm ci
npm run lint
npm run typecheck
npm test
npm run build:web
npm run build:acceptance
npm run build:windows
npm run validate:web
npm run validate:single
npm run validate:windows
npm run audit:licenses
```

Generated build and validation output is intentionally excluded from the public repository.

## Production coverage

- Unit and contract tests cover QR generation, localization, theme geometry, responsive behavior, animation invariants, tree topology, Ocean subdivision, top-down export, and the retained Pixel Wanderer 90% character transform.
- The production release is hard-blocked unless the direct two-camera Hero-area matrix passes all 128 of 128 rows across 114,368 sampled animation frames with no ratio exceptions.
- Web validation renders eight payload classes across all eight themes and decodes the actual colored WebGL canvas.
- Animated validation decodes multiple changing Scan frames for every theme.
- Single-file validation opens the exact HTML through `file://` and requires zero HTTP(S) requests.
- Windows validation launches the packaged executable, checks the exact VoxelQR Studio identity, and decodes all eight themes.
- License checks audit runtime packages against the permitted license policy.

## Manual release checks

After extracting the release ZIP, open both root entry points, switch through all eight themes, enter text and a URL, exercise rotate/pan/zoom, enter and leave Scan mode, export an image, and scan representative results with a physical phone. Real-phone recognition varies with camera focus, glare, distance, display density, and the scanner application.

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
npm run validate:motion
npm run validate:export
npm run validate:single
npm run validate:windows
npm run audit:licenses
```

Generated build and validation output is intentionally excluded from the public repository.

## Production coverage

- The accepted release has 229 passing automated tests across 39 suites; no earlier test was deleted, skipped, or weakened.
- Unit and contract tests cover QR generation, localization, nine-theme geometry, responsive behavior, animation invariants, tree topology, Ocean subdivision, the chibi rabbit, particles, top-down export, and the complete session-seeded Kitty motion state.
- Thirty fixed 240-second Kitty simulations must produce 30 distinct trajectory signatures and target sequences, stay inside the safe board, meet all natural behavior bands, avoid smoothness/stuck/edge failures, and repeat zero complete 44-second cycles. Ten production launches must also produce ten distinct cryptographic seeds and trajectories.
- Fixed-seed replay must reproduce the exact trajectory and final state. Explore → Scan → Explore must preserve intent, steering, heatmap, recent targets, seed, RNG, world pose, matrices, and clock for all six high-level intents.
- Web validation renders eight payload classes across all nine themes and decodes the actual colored WebGL canvas.
- Animated validation decodes multiple changing Scan frames for every theme.
- Export validation preserves the accepted 1,016-sample legacy sweep and adds 2,640 natural Kitty samples, requiring 3,656 of 3,656 real 1001×1001 same-scene captures to decode.
- Single-file validation opens the exact HTML through `file://` and requires zero HTTP(S) requests.
- Windows validation launches the packaged executable, checks the exact VoxelQR Studio identity, and decodes all nine themes.
- License checks audit runtime packages against the permitted license policy.

## Manual release checks

After extracting the release ZIP, open both root entry points, switch through all nine themes, enter text and a URL, exercise rotate/pan/zoom, enter and leave Scan mode, export an image, and scan representative results with a physical phone. Pay particular attention to Kitty's non-repeating natural motion across relaunches, exact arbitrary-state Scan restoration, rabbit/scarf integrity, particle contact/settling/fade, and short/long payload scaling. Real-phone recognition varies with camera focus, glare, distance, display density, and the scanner application.

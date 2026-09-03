# QR Pipeline — v1.1.0

1. Normalize the selected URL/text input and generate one canonical QR matrix with the local `qrcode` package.
2. Build deterministic Hero bodies and QR caps from that matrix. Micro-detail subdivides a logical module visually but never changes its bit or quiet zone.
3. For Voxel Kitty, derive a safe physical-board inset from the actual matrix and accepted visual/shadow envelope. A session-seeded natural-motion controller explores this domain with no fixed route or waypoint order. Payload and matrix changes preserve the seed, RNG, intent, and world pose while safely reprojecting a stale target when required.
4. Render one colored WebGL scene. Scene mode shows the Hero composition; Scan mode freezes the complete Kitty snapshot, hides every Kitty renderable and its shadow, and moves the same orthographic camera to top-down. Returning to Scene restores the exact pose and RNG continuation.
5. Export is captured from the same top-down scene at 1001×1001. There is no second QR renderer, `<img>`, SVG, overlay, synthetic raster gate, or scan-only recolor.
6. `jsQR` decodes actual `#garden-canvas` screenshots for eight payload classes in all nine themes, animated Scan frames, and the complete export phase sweep.

Required current gates:

- `QR_DECODE_GATE=PASS_72_OF_72`
- `SCAN_ANIMATED_DECODE_GATE=PASS_27_OF_27`
- `WEB_QR_RUNTIME_GATE=PASS_9_OF_9`
- `WINDOWS_QR_RUNTIME_GATE=PASS_9_OF_9`
- `WEB_SINGLE_HTML_QR_RUNTIME_GATE=PASS_9_OF_9`
- `R6_EXPORT_FRESH_LEGACY_1016_GATE=PASS_1016_OF_1016`
- `R6_EXPORT_STRICT_TOTAL_GATE=PASS_3656_OF_3656`
- `R6_FIXED_30_SEED_TRAJECTORY_GATE=PASS_30_OF_30_DISTINCT`
- `R6_44_SECOND_PERIODICITY_GATE=PASS_0_OF_30_REPEATED`
- `R6_SCAN_COMPLETE_SNAPSHOT_GATE=PASS_6_OF_6_INTENTS_EXACT`
- `PIXEL_WANDERER_QR_GATE=PASS`
- `R6_EXPORT_QR_DECODE_GATE=PASS_3656_OF_3656`
- `HIGH_DETAIL_QR_REGRESSION_GATE=PASS`

Automated decoding uses rendered canvas pixels. Physical-phone results depend on camera focus, glare, distance, display density, and the scanner application.

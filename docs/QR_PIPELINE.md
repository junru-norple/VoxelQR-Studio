# QR Pipeline — v1.0.0

1. Normalize the selected URL/text input and generate one canonical QR matrix with the local `qrcode` package.
2. Build deterministic Hero bodies and QR caps from that matrix. V8 micro-detail subdivides a logical module visually but never changes its bit or quiet zone.
3. Render one colored WebGL scene. Scene mode shows the Hero composition; Scan mode moves the same orthographic camera to top-down, continues phase at 0.42 motion amplitude, and preserves material identity.
4. Export is captured from the same top-down scene. There is no second canvas, `<img>`, SVG, overlay, synthetic raster gate, or scan-only recolor.
5. `jsQR` decodes actual `#garden-canvas` screenshots for eight payload classes in all eight themes.

Required current gates:

- `QR_DECODE_GATE=PASS_64_OF_64`
- `SCAN_ANIMATED_DECODE_GATE=PASS_24_OF_24`
- `WEB_QR_RUNTIME_GATE=PASS_8_OF_8`
- `WINDOWS_QR_RUNTIME_GATE=PASS_8_OF_8`
- `WEB_SINGLE_HTML_QR_RUNTIME_GATE=PASS_8_OF_8`
- `PIXEL_WANDERER_QR_GATE=PASS`
- `HIGH_DETAIL_QR_REGRESSION_GATE=PASS`

Automated decoding uses rendered canvas pixels. Physical-phone results depend on camera focus, glare, distance, display density, and the scanner application.

# VoxelQR Studio

VoxelQR Studio turns text or URLs into live, scannable 3D voxel QR codes. The scene updates while you type, stays fully interactive, and transitions into a top-down Scan view without replacing the QR with a second image or overlay. Version 1.0.0 runs offline as a Windows application or a single HTML file.

![VoxelQR Studio Pixel Wanderer](docs/assets/v1.0.0/pixel-wanderer.png)

## Download and run

Download `VoxelQR-Studio-v1.0.0.zip` and extract it before use.

- Windows 11 x64: open `VoxelQR-Studio.exe`.
- Offline Web: open `VoxelQR-Studio-Web.html` in a modern Chromium-based browser.
- No account, installer, Node.js, development server, analytics, or network connection is required for either release entry point.

## Eight animated themes

Sakura, Summer Grove, Maple, Ginkgo, Snow Pine, Sunset, Ocean Waves, and the original Pixel Wanderer all use real 3D geometry. Tree themes have distinct trunk and branch structures, Ocean combines multiple travelling wave scales, and Pixel Wanderer uses a bounded character animation set. Scan mode preserves the same scene, logical QR matrix, colors, and motion phase.

![VoxelQR Studio Sunset Scan](docs/assets/v1.0.0/sunset-scan.png)

## Controls and export

- Type or paste text and URLs for immediate scene updates.
- Rotate, pan, and zoom in Scene mode.
- Use Scan to move the same scene into its QR-readable top view.
- Export the current top-down result locally.
- Switch between English and Traditional Chinese.

## Development

Requirements: Node.js 24+, npm, Windows 11 x64 for the Electron build, and a Chromium browser for runtime validation.

```powershell
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build:web
npm run build:acceptance
npm run build:windows
```

The full production validation sequence is documented in [Testing](docs/TESTING.md). Architecture, QR behavior, security, privacy, and design notes are available under [docs](docs/).

## Acknowledgements

VoxelQR Studio was independently implemented. Its living 3D QR presentation and interaction polish were informed at a design- and behavior-reference level by Enzo Manuel Mangano's public [Cherry Blossom post](https://x.com/reactiive_/status/2040511285998313827) and the [enzomanuelmangano/demos](https://github.com/enzomanuelmangano/demos) project. No source code, components, assets, shaders, constants, or UI from that upstream project are included in VoxelQR Studio. The upstream `demos` project uses its own custom Software License Agreement and retains `Copyright © 2024 Enzo Manuel Mangano. All rights reserved.`

## Known limitations

- Camera focus, glare, distance, and the scanner app affect real-phone QR recognition.
- WebGL 2 and hardware acceleration are recommended.
- Very long payloads create denser QR matrices and may need a larger on-screen presentation for reliable scanning.
- Windows builds are unsigned portable applications; Windows may display its standard reputation warning.

License: MIT. Third-party notices are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

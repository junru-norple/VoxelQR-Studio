# VoxelQR Studio

VoxelQR Studio turns text or URLs into live, scannable 3D voxel QR codes. The scene updates while you type, stays fully interactive, and transitions into a top-down Scan view without replacing the QR with a second image or overlay. Version 1.1.0 runs offline as a Windows application or a single HTML file.

![VoxelQR Studio Pixel Wanderer](docs/assets/v1.0.0/pixel-wanderer.png)

## Download and run

Download `VoxelQR-Studio-v1.1.0.zip` and extract it before use.

- Windows 11 x64: open `VoxelQR-Studio.exe`.
- Offline Web: open `VoxelQR-Studio-Web.html` in a modern Chromium-based browser.
- No account, installer, Node.js, development server, analytics, or network connection is required for either release entry point.

## Nine animated themes

Sakura, Summer Grove, Maple, Ginkgo, Snow Pine, Sunset, Ocean Waves, the re-authored Pixel Wanderer, and Voxel Kitty all use real 3D geometry. Tree themes have distinct trunk and branch structures, Ocean combines multiple travelling wave scales, Pixel Wanderer is a rounded chibi rabbit, and the original orange-and-gold Voxel Kitty moves through natural walk, run, short-dash, observe, turn, and tail actions.

The seven large compositions occupy 40%–50% of the active QR projection, Pixel Wanderer occupies 28%–35%, and Voxel Kitty occupies 8%–12%. Every Hero grows monotonically with the effective QR board instead of staying at a fixed world size.

Each production launch creates a fresh 128-bit cryptographic Kitty session seed. A two-layer controller combines randomly selected high-level intent with smooth steering, velocity inertia, bounded turning, early edge avoidance, a 9×9 visitation heatmap, and recent-target penalties. It explores the complete safe physical board without a fixed waypoint order, finite route, modulo loop, or mandatory return to its origin. The seed and motion state persist when the payload or QR matrix changes.

Entering Scan freezes Kitty's intent, position, velocity, steering, heatmap, recent targets, session seed, and RNG state, then hides Kitty and its shadow completely. Returning to Scene restores the exact snapshot and continues naturally from the same point. The accepted R5 appearance, camera, board, and object-ID mask ratio of `0.08016706` remain unchanged.

Atmospheric particles fall onto the current QR board, collide at its surface, settle for 0.5–1.5 seconds, and fade in place. They never remain visibly below the board.

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
npm run validate:web
npm run validate:motion
npm run validate:export
npm run validate:single
npm run validate:windows
npm run audit:licenses
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

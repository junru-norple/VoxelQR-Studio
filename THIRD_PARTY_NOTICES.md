# Third-party notices

VoxelQR Studio's source is MIT licensed. Runtime dependencies were selected for permissive redistribution and re-audited for v1.1.0 on 2026-08-30. No direct or transitive dependency was added or upgraded from v1.0.0.

## Direct runtime components

| Component | Version | License | Upstream |
|---|---:|---|---|
| Three.js | 0.180.0 | MIT | https://github.com/mrdoob/three.js |
| node-qrcode | 1.5.4 | MIT | https://github.com/soldair/node-qrcode |
| Electron | 43.4.1 | MIT | https://github.com/electron/electron |

Electron redistributes Chromium, Node.js, FFmpeg, and related components. Their full notices are included in the Electron distribution as `LICENSE` and `LICENSES.chromium.html`.

## Design-reference acknowledgement (not a bundled dependency)

VoxelQR Studio was independently implemented. Enzo Manuel Mangano's public [Cherry Blossom post](https://x.com/reactiive_/status/2040511285998313827) and [enzomanuelmangano/demos](https://github.com/enzomanuelmangano/demos) project were consulted only as design- and behavior-level references for a polished, living 3D QR presentation. No upstream source code, components, assets, shaders, constants, or UI are included or redistributed here.

The upstream `demos` repository is governed by its own custom Software License Agreement, which restricts redistribution of its code, and states: `Copyright © 2024 Enzo Manuel Mangano. All rights reserved.` That upstream agreement does not replace VoxelQR Studio's MIT license because upstream code is not part of this project.

## node-qrcode production dependency closure

The bundled QR package resolves the following permissive dependencies: dijkstrajs 1.0.3 (MIT), pngjs 5.0.0 (MIT), yargs 15.4.1 (MIT), cliui 6.0.0 (ISC), string-width 4.2.3 (MIT), strip-ansi 6.0.1 (MIT), ansi-regex 5.0.1 (MIT), wrap-ansi 6.2.0 (MIT), ansi-styles 4.3.0 (MIT), color-convert 2.0.1 (MIT), color-name 1.1.4 (MIT), decamelize 1.2.0 (MIT), find-up 4.1.0 (MIT), locate-path 5.0.0 (MIT), p-locate 4.1.0 (MIT), p-limit 2.3.0 (MIT), p-try 2.2.0 (MIT), path-exists 4.0.0 (MIT), get-caller-file 2.0.5 (ISC), require-directory 2.1.1 (MIT), require-main-filename 2.0.0 (ISC), set-blocking 2.0.0 (ISC), emoji-regex 8.0.0 (MIT), is-fullwidth-code-point 3.0.0 (MIT), which-module 2.0.1 (ISC), y18n 4.0.3 (ISC), yargs-parser 18.1.3 (ISC), and camelcase 5.3.1 (MIT).

No third-party images, fonts, shaders, 3D models, or audio assets are shipped. All visuals are generated procedurally from original project code.

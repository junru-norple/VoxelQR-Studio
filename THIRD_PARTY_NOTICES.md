[English](#english) | [繁體中文](#traditional-chinese)

<a id="english"></a>

# Third-party notices — v1.1.1

VoxelQR Studio's source is MIT licensed. Runtime dependencies were selected for permissive redistribution and re-audited for v1.1.1 on 2026-09-08. No direct or transitive dependency was added or upgraded from v1.0.0 or v1.1.0.

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

<a id="traditional-chinese"></a>

# 第三方聲明 — v1.1.1

VoxelQR Studio 原始碼採 MIT 授權。執行階段依賴均選用允許寬鬆重新散布的授權，並於 2026-09-08 為 v1.1.1 重新稽核。相較 v1.0.0 或 v1.1.0，沒有新增或升級任何直接或傳遞依賴。

## 直接執行階段元件

| 元件 | 版本 | 授權 | 上游 |
|---|---:|---|---|
| Three.js | 0.180.0 | MIT | https://github.com/mrdoob/three.js |
| node-qrcode | 1.5.4 | MIT | https://github.com/soldair/node-qrcode |
| Electron | 43.4.1 | MIT | https://github.com/electron/electron |

Electron 會重新散布 Chromium、Node.js、FFmpeg 及相關元件；完整聲明包含於 Electron 發行內容中的 `LICENSE` 與 `LICENSES.chromium.html`。

## 設計參考致謝（不是隨附依賴）

VoxelQR Studio 為獨立實作。Enzo Manuel Mangano 公開的 [Cherry Blossom 貼文](https://x.com/reactiive_/status/2040511285998313827) 與 [enzomanuelmangano/demos](https://github.com/enzomanuelmangano/demos) 專案只作為打造細緻、具生命感 3D QR 呈現的設計與行為層級參考。本專案未包含或重新散布任何上游原始碼、元件、素材、著色器、常數或介面。

上游 `demos` 儲存庫 受其自訂 Software License Agreement 規範，限制其程式碼重新散布，並載明：`Copyright © 2024 Enzo Manuel Mangano. All rights reserved.` 因本專案未包含任何上游程式碼，該上游協議不會取代 VoxelQR Studio 的 MIT 授權。

## node-qrcode 正式依賴閉包

隨附的 QR 套件解析到以下寬鬆授權依賴：dijkstrajs 1.0.3 (MIT)、pngjs 5.0.0 (MIT)、yargs 15.4.1 (MIT)、cliui 6.0.0 (ISC)、string-width 4.2.3 (MIT)、strip-ansi 6.0.1 (MIT)、ansi-regex 5.0.1 (MIT)、wrap-ansi 6.2.0 (MIT)、ansi-styles 4.3.0 (MIT)、color-convert 2.0.1 (MIT)、color-name 1.1.4 (MIT)、decamelize 1.2.0 (MIT)、find-up 4.1.0 (MIT)、locate-path 5.0.0 (MIT)、p-locate 4.1.0 (MIT)、p-limit 2.3.0 (MIT)、p-try 2.2.0 (MIT)、path-exists 4.0.0 (MIT)、get-caller-file 2.0.5 (ISC)、require-directory 2.1.1 (MIT)、require-main-filename 2.0.0 (ISC)、set-blocking 2.0.0 (ISC)、emoji-regex 8.0.0 (MIT)、is-fullwidth-code-point 3.0.0 (MIT)、which-module 2.0.1 (ISC)、y18n 4.0.3 (ISC)、yargs-parser 18.1.3 (ISC) 與 camelcase 5.3.1 (MIT)。

本發行版未隨附第三方圖片、字型、著色器、3D 模型或音訊素材；所有視覺均由原創專案程式碼程序化產生。

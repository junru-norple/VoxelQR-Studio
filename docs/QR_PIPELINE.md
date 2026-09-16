[English](#english) | [繁體中文](#traditional-chinese)

<a id="english"></a>

# QR pipeline

## Production flow

1. Normalize the selected URL or text and create one canonical QR matrix with the local `qrcode` package.
2. Build deterministic character/theme bodies and QR caps from that matrix. Visual micro-detail may subdivide a logical module, but it never changes the module bit or quiet zone.
3. For Voxel Kitty, derive a safe physical-board inset from the actual matrix and the defined visual and shadow envelope. The natural-motion controller uses a per-launch seed and explores this domain without a fixed route or waypoint order. Encoded-content or matrix changes preserve the random stream, high-level action, turning state, and world position while safely replacing an obsolete destination when necessary.
4. Render one colored WebGL scene. Explore shows the 3D composition. Scan first freezes Kitty's complete state, hides every Kitty renderable and its shadow, and then moves the same orthographic camera to top-down. Returning to Explore restores the exact state and continues the same random stream.
5. Export captures the same top-down scene at 1001×1001. There is no second QR renderer, `<img>`, SVG, overlay, synthetic bitmap, or scan-only recolor.
6. `jsQR` decodes pixels captured from the actual `#garden-canvas` across all nine themes, representative content classes, animated Scan frames, and the export sweep.

## Required contracts

- A single canonical matrix drives Scene, Scan, and export.
- All nine themes retain the logical matrix and complete quiet zone.
- Kitty and its shadow contribute no pixels in Scan.
- Explore → Scan → Explore preserves the full Kitty state exactly.
- Export remains a real capture of the production scene and decodes at 1001×1001.
- Static, animated, single-file Web, and Windows checks decode the built application surfaces without network access.

Automated decoding verifies rendered pixels. Physical-phone results can still vary with camera focus, glare, distance, display density, and the scanner application.

## Compatibility note

The internal `hero:v1.1.0` deterministic seed namespace remains unchanged to preserve the byte-compatible geometry and motion behavior established in v1.1.0. It is a technical behavior-contract identifier, not release metadata or a user-facing product version.

<a id="traditional-chinese"></a>

# QR 處理流程

## 正式流程

1. 正規化選定的網址或文字，並使用本機 `qrcode` 套件產生唯一的權威 QR 矩陣。
2. 依該矩陣建立確定性的角色／主題本體與 QR 頂面。視覺微細節可以細分邏輯模組，但永遠不會改變模組位元或留白區。
3. Voxel Kitty 會依實際矩陣及既定的視覺與陰影邊界，推導安全的實體底板內縮範圍。自然動態控制器使用每次啟動建立的種子，在此範圍內探索，不採固定路線或路點順序。編碼內容或矩陣改變時，程式會保留隨機資料流、高階動作、轉向狀態及世界座標位置，只在必要時安全更換已失效的目的地。
4. 程式只渲染一個彩色 WebGL 場景。探索模式顯示 3D 構圖；俯視掃描會先凍結小貓的完整狀態、隱藏所有小貓可渲染物件與陰影，再把同一部正交相機移到俯視角度。返回探索模式後，程式會精確還原狀態並延續同一組隨機資料流。
5. 匯出功能會以 1001×1001 擷取相同的俯視場景；不存在第二個 QR 渲染器、`<img>`、SVG、疊加層、合成點陣圖或僅供掃描使用的重新著色。
6. `jsQR` 會解碼實際 `#garden-canvas` 的擷取像素，涵蓋九種主題、代表性內容類別、動態掃描畫面及完整匯出取樣。

## 必要契約

- 場景、掃描與匯出都由同一個權威矩陣驅動。
- 九種主題都保留邏輯矩陣與完整留白區。
- 掃描模式中的小貓與陰影不得產生任何像素。
- 探索 → 掃描 → 探索必須精確保存完整小貓狀態。
- 匯出必須是正式場景的真實擷取，並能在 1001×1001 解碼。
- 靜態、動態、單檔 Web 及 Windows 檢查都必須解碼實際建置的應用程式畫面，且不使用網路。

自動解碼驗證實際渲染像素。實體手機結果仍可能受相機對焦、反光、距離、顯示密度及掃描應用程式影響。

## 相容性說明

內部 `hero:v1.1.0` 確定性種子命名空間維持不變，用於保留 v1.1.0 所建立的幾何與動態位元相容性。它是技術行為契約識別字，不是發行中繼資料或使用者可見的產品版本。
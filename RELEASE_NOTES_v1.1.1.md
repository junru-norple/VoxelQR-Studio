[English](#english) | [繁體中文](#traditional-chinese)

<a id="english"></a>

# VoxelQR Studio v1.1.1 Release Notes

## Overview

VoxelQR Studio v1.1.1 refines public documentation, completes interface localization, restores the official theme names, and updates the presentation screenshots.

Product mechanics are unchanged from v1.1.0. Character models, motion, QR generation, Scan behavior, camera controls, export, and offline operation remain the same.

## Character scale

Pixel Wanderer is a compact chibi character that scales proportionally with the QR board. In the standard Explore reference view, Voxel Kitty occupies about 8% of the board and scales proportionally as the QR matrix grows.

## Canonical theme names

The nine official English theme names are Sakura, Summer Grove, Maple, Ginkgo, Snow Pine, Sunset, Ocean Waves, Pixel Wanderer, and Voxel Kitty.

## Interface localization

Traditional Chinese mode localizes the title, subtitle, all nine theme names and descriptions, controls, hints, and status text. English mode remains fully English. Product names, URLs, payload text, WebGL, Node.js, and other technical proper names remain unchanged where appropriate.

## Locale-matched presentation

The default README uses six locale-matched screenshots captured from VoxelQR Studio v1.1.1:

- `pixel-wanderer-scene.en.png` and `pixel-wanderer-scene.zh-TW.png`
- `voxel-kitty-scene.en.png` and `voxel-kitty-scene.zh-TW.png`
- `scan-view.en.png` and `scan-view.zh-TW.png`

Each English and Traditional Chinese pair uses the same payload, viewport, character state, camera state, and composition; only the interface language differs. The Pixel Wanderer and Voxel Kitty images use clear front or front three-quarter views. The Scan images intentionally remain top-down, include the complete QR and quiet zone, and decode from the actual application scene without a substituted QR layer.

## Verification summary

- Product tests: 231/231 across 39/39 suites.
- Export decoding record: 3,656/3,656 successful same-scene exports.
- Web, single-file Web, and Windows runtime checks: passed.
- Locale coherence in English and Traditional Chinese across all three application surfaces: passed.
- Six presentation screenshots, paired state and composition, README rendering, and both complete Scan decodes: passed.
- Long-term collaboration rules: English 15/15 and Traditional Chinese 15/15.
- Direct and transitive dependency graph: unchanged from v1.1.0.

## Known limitations

Physical-phone QR recognition still depends on camera focus, glare, distance, display density, and the scanner application. WebGL 2 and hardware acceleration are recommended. The Windows portable executable is unsigned, so Windows may display its standard reputation warning.

<a id="traditional-chinese"></a>

# VoxelQR Studio v1.1.1 發行說明

## 概要

VoxelQR Studio v1.1.1 改善公開文件、補齊介面本地化、恢復正式主題名稱，並更新展示截圖。

產品機制與 v1.1.0 相同；角色模型、動態、QR 產生、掃描行為、相機控制、匯出及離線操作均維持不變。

## 角色尺寸

像素旅兔採用小巧的可愛比例，並會隨 QR 底板同比例縮放。在標準探索參考視角下，體素小貓約佔底板的 8%，也會隨 QR 矩陣增大而同比例放大。

## 正式主題名稱

九個正式繁中主題名稱為櫻花、盛夏綠蔭、楓葉、銀杏、雪松、日落、海浪、像素旅兔及 Voxel Kitty。

## 介面本地化

繁體中文模式會將標題、副標、九個主題名稱與描述、控制項、提示及狀態文字完整顯示為繁體中文。英文模式維持完整英文。產品名稱、網址、承載內容、WebGL、Node.js 與其他技術專有名稱，可在適當情況下維持原文。

## 語系相符的展示素材

預設 README 使用以 VoxelQR Studio v1.1.1 實際擷取的六張語系相符展示圖：

- `pixel-wanderer-scene.en.png` 與 `pixel-wanderer-scene.zh-TW.png`
- `voxel-kitty-scene.en.png` 與 `voxel-kitty-scene.zh-TW.png`
- `scan-view.en.png` 與 `scan-view.zh-TW.png`

每組英、繁中圖片都使用相同的承載內容、視窗尺寸、角色狀態、相機狀態與構圖，差異只有介面語言。像素旅兔與 Voxel Kitty 圖片採清楚的正面或正面四分之三視角。掃描圖刻意維持俯視，包含完整 QR 與留白區，並直接從實際應用程式場景解碼，不使用替代 QR 圖層。

## 驗證摘要

- 產品測試：231/231，涵蓋 39/39 個測試套件。
- 匯出解碼紀錄：3,656/3,656 筆同場景匯出成功。
- Web、單檔 Web 與 Windows 執行檢查：通過。
- 三種應用程式形式的英文與繁中語系一致性：通過。
- 六張展示截圖、成對狀態與構圖、README 實際渲染，以及兩張完整掃描圖解碼：通過。
- 長期協作規則：英文 15/15、繁體中文 15/15。
- 直接與傳遞依賴關係：與 v1.1.0 相同。

## 已知限制

實體手機的 QR 辨識仍會受相機對焦、反光、距離、顯示密度及掃描應用程式影響。建議使用 WebGL 2 並啟用硬體加速。Windows 可攜式執行檔未簽章，因此 Windows 可能顯示標準信譽提示。
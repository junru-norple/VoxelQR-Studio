[English](#english) | [繁體中文](#traditional-chinese)

<a id="english"></a>

# Release validation — v1.1.1

## Validation scope

VoxelQR Studio v1.1.1 is verified from one source tree across the multi-file Web build, single-file offline Web build, Electron desktop assets, and Windows portable executable. The release checks cover:

- ESLint, TypeScript, and every existing or newly added automated test.
- Complete English and Traditional Chinese interface text for titles, subtitles, controls, hints, status text, and all nine canonical theme names and descriptions, with no unintended cross-locale fallback.
- Six locale-matched screenshots captured from VoxelQR Studio v1.1.1: English and Traditional Chinese Pixel Wanderer scenes, Voxel Kitty scenes, and top-down Scan views. Each language pair uses the same payload, viewport, application state, camera, and composition except for interface language.
- A rendered README preview whose six referenced images load as images, together with bilingual equivalence, anchors, internal links, image references, version provenance, and public-copy accuracy.
- Complete top-down Scan images captured from the application, including the QR finder patterns and quiet zone, with successful decoding and no substituted QR layer.
- Web, single-file Web, and Windows offline behavior; static and animated QR decoding; top-down export; Kitty motion; Scan freeze, hide, and restore; camera controls; and particle contact.
- Licensing and public-safety checks covering the authoritative English MIT License, the non-authoritative Traditional Chinese reference translation, third-party attribution, privacy, sensitive information, credentials, local paths, and package layout.
- PC-01 through PC-15 coverage in both language sections of the sole project collaboration policy.

## Recorded results

- ESLint and TypeScript: passed.
- Product tests: 231/231 across 39/39 suites.
- Export decoding record: 3,656/3,656 successful same-scene exports.
- Web, single-file Web, and Windows runtime and locale-coherence checks: passed.
- Six locale-matched presentation screenshots and both complete Scan decodes: passed.
- Documentation rendering, links, anchors, image references, canonical names, and bilingual checks: passed.
- Long-term collaboration rules: English 15/15 and Traditional Chinese 15/15.

Automated evidence records the technical result of each check. Physical-phone QR recognition can still vary with focus, glare, distance, display density, and the scanner application.

## Product compatibility

Product mechanics are unchanged from v1.1.0. Character models, motion, QR generation, Scan behavior, camera controls, export, and offline operation remain the same.

## Immutable history and publication layout

Published v1.0.0 and v1.1.0 versions, tags, Releases, attachments, and checksums remain immutable. Public source contains maintainable source code and documentation, while generated builds, private evidence, release ZIPs, and executables remain outside the source repository. Every release ZIP is checked for licensing, privacy, sensitive data, extraction, and checksum integrity.

<a id="traditional-chinese"></a>

# 發行驗證 — v1.1.1

## 驗證範圍

VoxelQR Studio v1.1.1 使用同一份原始碼，驗證多檔 Web 版、離線單檔 Web 版、Electron 桌面資產及 Windows 可攜式執行檔。發行檢查涵蓋：

- ESLint、TypeScript，以及所有既有或新增的自動測試。
- 標題、副標、控制項、提示、狀態文字，以及九個正式主題名稱與描述的完整英文及繁中介面；兩種模式都不得出現非預期的跨語系替代文字。
- 以 VoxelQR Studio v1.1.1 實際擷取的六張語系相符展示圖：英文與繁中的像素旅兔場景、Voxel Kitty 場景及俯視掃描畫面。每組語言圖片除介面語言外，均使用相同的承載內容、視窗大小、應用程式狀態、相機與構圖。
- 六張引用圖片均能以圖片形式實際載入的 README 預覽，並檢查雙語語意對等、錨點、內部連結、圖片引用、版本來源及公開敘述準確性。
- 從應用程式擷取的完整俯視掃描圖，包含 QR 定位框及留白區，可成功解碼，且未替換或疊加另一張 QR 圖。
- Web、單檔 Web 與 Windows 的離線行為、靜態與動態 QR 解碼、俯視匯出、小貓動態、掃描凍結／隱藏／還原、相機控制及粒子接觸。
- 授權與公開安全檢查，包含權威英文 MIT License、非權威繁中參考譯文、第三方致謝、隱私、敏感資訊、憑證、本機路徑及封裝版面。
- 專案唯一長期協作規則中，英文與繁中 PC-01～PC-15 的完整覆蓋。

## 記錄結果

- ESLint 與 TypeScript：通過。
- 產品測試：231/231，涵蓋 39/39 個測試套件。
- 匯出解碼紀錄：3,656/3,656 筆同場景匯出成功。
- Web、單檔 Web 與 Windows 的執行及語系一致性檢查：通過。
- 六張語系相符展示圖與兩張完整掃描圖解碼：通過。
- 文件渲染、連結、錨點、圖片引用、正式名稱及雙語檢查：通過。
- 長期協作規則：英文 15/15、繁體中文 15/15。

自動證據會記錄每項檢查的技術結果。實體手機的 QR 辨識仍可能受對焦、反光、距離、顯示密度及掃描應用程式影響。

## 產品相容性

產品機制與 v1.1.0 相同；角色模型、動態、QR 產生、掃描行為、相機控制、匯出及離線操作均維持不變。

## 歷史不可變與公開版面

已發布的 v1.0.0 與 v1.1.0 版本、標籤、Release、附件及校驗碼均維持不可變。公開原始碼只包含可維護的程式碼與文件；產生的建置、非公開證據、發行 ZIP 及執行檔不放入原始碼儲存庫。每個發行 ZIP 都會檢查授權、隱私、敏感資料、解壓縮及校驗碼完整性。
[English](#english) | [繁體中文](#traditional-chinese)

<a id="english"></a>

# Testing and verification

## Development checks

```powershell
npm ci
npm run validate:root-containment
npm run lint
npm run typecheck
npm test
npm run build:web
npm run refresh:web-dist
npm run build:single
npm run build:windows
npm run capture:public
npm run validate:docs
npm run validate:web
npm run validate:motion
npm run validate:visual
npm run validate:export
npm run validate:single
npm run validate:windows
npm run audit:licenses
npm run audit:privacy
```

Generated builds and verification output are excluded from the public repository. Temporary files, caches, browser profiles, and evidence stay inside Project Root. Per-process environment variables may point to project-local paths; persistent PATH or environment settings must not be changed.

## v1.1.1 verification coverage

The current product suite contains 231 tests across 39 suites. The established export sweep contains 3,656 same-scene cases. Required coverage includes:

- Unit and contract checks for QR generation, complete bilingual messages, all nine localized theme names and descriptions, responsive behavior, theme geometry, particles, character contracts, and Scan state.
- Exact canonical theme names: Sakura, Summer Grove, Maple, Ginkgo, Snow Pine, Sunset, Ocean Waves, Pixel Wanderer, and Voxel Kitty in English; 櫻花、盛夏綠蔭、楓葉、銀杏、雪松、日落、海浪、像素旅兔及 Voxel Kitty in Traditional Chinese.
- A locale-coherence browser check that scans the visible English interface for unexpected Traditional Chinese and the visible Traditional Chinese interface for unintended English fallback, while allowing product names, URLs, and technical proper nouns.
- Paired-image checks for identical payload, viewport, character state, camera, and composition across languages; front or front three-quarter recognizability for both character scenes; and real decoding of both top-down Scan images.
- Web verification across all nine themes and representative content classes, including animated Scan frames from the actual colored WebGL canvas.
- Natural Kitty movement checks covering distinct production launches, deterministic replay, smooth movement, board safety, broad behavior distribution, and no fixed short-period loop.
- Exact Explore → Scan → Explore restoration of action, turning controller, visitation history, recent destinations, seed, random-stream state, world position, matrices, and clock.
- Export verification of real 1001×1001 same-scene captures, preserving every existing case and the full Kitty sweep.
- Exact single-file HTML opened through `file://`, plus the packaged Windows executable, with zero HTTP(S) requests and complete locale checks.
- Documentation checks for bilingual equivalence, anchors, internal links, six locale-matched v1.1.1 images, actual README image loading, public-copy accuracy, canonical names, PC-01 through PC-15, public safety, and licensing.

## Recorded result

ESLint and TypeScript pass. All 231/231 product tests pass across 39/39 suites. Web, single-file Web, and Windows checks pass without network requests, and the interface remains locale-coherent. The six documentation screenshots load from v1.1.1 paths, each language pair preserves the same application state and composition, and both complete Scan images decode successfully. The established 3,656/3,656 export record remains the exhaustive export reference.

Product mechanics are unchanged from v1.1.0. Character models, motion, QR generation, Scan behavior, camera controls, export, and offline operation remain the same.

<a id="traditional-chinese"></a>

# 測試與驗證

## 開發檢查

```powershell
npm ci
npm run validate:root-containment
npm run lint
npm run typecheck
npm test
npm run build:web
npm run refresh:web-dist
npm run build:single
npm run build:windows
npm run capture:public
npm run validate:docs
npm run validate:web
npm run validate:motion
npm run validate:visual
npm run validate:export
npm run validate:single
npm run validate:windows
npm run audit:licenses
npm run audit:privacy
```

產生的建置與驗證輸出會排除在公開原始碼儲存庫之外。所有暫存檔、快取、瀏覽器設定檔與證據都留在專案根目錄內。個別程序可使用環境變數指向專案內路徑，但不得修改永久 PATH 或環境設定。

## v1.1.1 驗證範圍

目前產品測試包含 39 個測試套件、共 231 項測試；既有完整匯出取樣包含 3,656 筆同場景案例。必要覆蓋包含：

- QR 產生、完整雙語訊息、九個本地化主題名稱與描述、響應式行為、主題幾何、粒子、角色契約及掃描狀態的單元與契約檢查。
- 精確的正式主題名稱：英文為 Sakura、Summer Grove、Maple、Ginkgo、Snow Pine、Sunset、Ocean Waves、Pixel Wanderer 及 Voxel Kitty；繁中為櫻花、盛夏綠蔭、楓葉、銀杏、雪松、日落、海浪、像素旅兔及 Voxel Kitty。
- 語系一致性瀏覽器檢查：英文介面不得混入非預期繁中，繁中介面不得出現非預期英文替代文字；產品名稱、網址及技術專有名稱可保留。
- 成對圖片除語言外，必須使用相同的編碼內容、視窗大小、角色狀態、相機及構圖；兩張角色場景要能從正面或正面四分之三視角辨識；兩張俯視掃描圖都必須實際解碼。
- Web 驗證涵蓋九種主題與代表性內容類別，並從實際彩色 WebGL 畫布解碼動態掃描畫面。
- 小貓自然動態檢查涵蓋不同正式啟動、確定性重播、平滑移動、底板安全、廣泛行為分布，以及不得出現固定的短週期循環。
- 探索 → 掃描 → 探索必須精確還原動作、轉向控制器、造訪歷史、近期目的地、種子、隨機資料流、世界座標位置、矩陣及時鐘。
- 匯出驗證使用真實的 1001×1001 同場景擷取，保留所有既有案例與完整小貓取樣。
- 透過 `file://` 開啟精確單檔 HTML，並驗證封裝後的 Windows 執行檔；兩者都必須保持 HTTP(S) 請求為 0，且完成語系檢查。
- 文件檢查涵蓋雙語語意對等、錨點、內部連結、六張語系相符的 v1.1.1 圖片、README 圖片實際載入、公開敘述準確性、正式名稱、PC-01～PC-15、公開安全及授權。

## 記錄結果

ESLint 與 TypeScript 均通過。39/39 個測試套件中的 231/231 項產品測試全部通過。Web、單檔 Web 與 Windows 檢查在沒有網路請求的情況下通過，介面也維持語系一致。六張文件截圖均從 v1.1.1 路徑載入，每組語言圖片保留相同的應用程式狀態與構圖，兩張完整掃描圖皆可成功解碼。既有 3,656/3,656 筆匯出紀錄持續作為完整匯出參考。

產品機制與 v1.1.0 相同；角色模型、動態、QR 產生、掃描行為、相機控制、匯出及離線操作均維持不變。
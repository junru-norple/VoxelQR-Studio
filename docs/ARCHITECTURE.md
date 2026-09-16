[English](#english) | [繁體中文](#traditional-chinese)

<a id="english"></a>

# Architecture

## Runtime ownership

`src/main.ts` owns the bilingual interface, live-input scheduler, theme selection, Explore/Scan state, export actions, and the validation-only browser interface. `src/core/qr.ts` creates the single canonical QR matrix. `src/scene/VoxelGarden.ts` owns one persistent Three.js scene, orthographic camera, Arcball controls, renderer, lights, reusable theme pools, Scan transition, performance counters, and atmospheric fallback. `src/scene/v8Hero.ts` builds the semantic character and theme geometry. The Kitty natural-motion module owns its per-launch seed, serializable random stream, high-level actions, turning controller, visitation history, recent destinations, and board-safe state.

## One QR, one scene

All nine themes allocate body, dark-cap, light-cap, and particle `InstancedMesh` pools once. Encoded-content changes rebuild deterministic instance data from the canonical matrix; theme changes switch data and visibility. The scene, camera, canvas, geometry pools, materials, programs, and managed listener counts remain stable.

Dark and light QR caps come from the canonical logical-module matrix. Each logical cell may be subdivided visually into 2×2 micro-caps, but its occupancy, color role, and quiet zone never change. Explore → Scan moves the same camera in the same scene. It does not create an overlay, second canvas, synthetic QR, replacement scene, or scan-only recolor.

## Character composition

The production geometry uses rounded micro-voxels. Trees store anchored, primary, secondary, and canopy semantics; Sunset is a sampled micro-voxel sphere; Ocean Waves stores three wave-band inputs per tile; Pixel Wanderer is an original rounded chibi rabbit; and Voxel Kitty uses original orange, gold, cream, dark-brown, and pink voxel groups.

Scale follows the effective QR grid through a monotonic transition. Pixel Wanderer is a compact chibi character that scales proportionally with the QR board. In the standard Explore reference view, Voxel Kitty occupies about 8% of the board and scales proportionally as the QR matrix grows.

## Kitty movement and Scan state

Kitty movement has no finite route or prescribed waypoint order. A new 128-bit cryptographic seed is created once per production launch and drives a serializable xoshiro128** stream. The high-level layer selects walk, run, dash, observe, turn, and tail actions within broad statistical bands. The low-level layer applies bounded angular velocity and acceleration, speed inertia, smooth acceleration and deceleration, continuous wandering, and early edge repulsion. A 9×9 visitation map and bounded recent-destination history bias sampling toward under-visited safe regions without forcing a coverage loop.

The complete movement state freezes before the Scan camera transition. Kitty geometry and its shadow are hidden in Scan. Returning to Explore restores the exact clock, pose, action, turning state, visitation history, recent destinations, seed, and random-stream state. Matrix changes safely reproject an obsolete destination while preserving world position and the rest of the session state.

## Release surfaces

The multi-file Web build, single-file Web build, Electron desktop assets, and Windows portable executable are produced from the same source. The single-file Web and Windows entry points are offline. Version 1.1.1 updates interface localization, public documentation, presentation images, and release metadata. Product mechanics are unchanged from v1.1.0. Character models, motion, QR generation, Scan behavior, camera controls, export, and offline operation remain the same.

<a id="traditional-chinese"></a>

# 架構

## 執行階段職責

`src/main.ts` 負責雙語介面、即時輸入排程、主題選擇、探索／掃描狀態、匯出動作，以及僅供驗證使用的瀏覽器介面。`src/core/qr.ts` 產生唯一的權威 QR 矩陣。`src/scene/VoxelGarden.ts` 管理單一持久的 Three.js 場景、正交相機、Arcball 控制器、渲染器、燈光、可重複使用的主題資源池、掃描轉場、效能計數器及氣氛效果降級。`src/scene/v8Hero.ts` 建立具語意的角色與主題幾何；小貓自然動態模組則管理每次啟動的種子、可序列化的隨機資料流、高階動作、轉向控制器、造訪歷史、近期目的地及底板安全狀態。

## 單一 QR、單一場景

九種主題都只配置一次本體、深色頂面、淺色頂面及粒子 `InstancedMesh` 資源池。編碼內容變更時，程式會依權威矩陣重建確定性的實例資料；切換主題時只變更資料與可見性。場景、相機、畫布、幾何資源池、材質、程式及受管理的事件監聽數量均維持穩定。

深色與淺色 QR 頂面皆源自權威的邏輯模組矩陣。每個邏輯單元可在視覺上細分為 2×2 微型頂面，但其占用狀態、色彩角色及留白區永遠不變。從探索場景切換至俯視掃描時，只會移動同一場景中的同一部相機，不會建立疊加層、第二張畫布、合成 QR、替代場景或僅供掃描使用的重新著色。

## 角色構圖

正式幾何採用圓角微型體素。樹木保存錨點、主枝、次枝及樹冠語意；日落是取樣後的微型體素球體；海浪的每個方塊保存三組波帶輸入；像素旅兔是原創圓潤的可愛比例兔子；Voxel Kitty 則使用原創的橘、金、奶油、深棕與粉紅色體素群組。

角色尺寸會依有效 QR 網格進行單調縮放。像素旅兔採用小巧的可愛比例，並會隨 QR 底板同比例縮放。在標準探索參考視角下，體素小貓約佔底板的 8%，也會隨 QR 矩陣增大而同比例放大。

## 小貓移動與掃描狀態

小貓不使用有限路線或預先規定的路點順序。每次正式啟動只建立一次新的 128 位元加密種子，並驅動可序列化的 xoshiro128** 資料流。高階層會在寬鬆統計範圍內選擇走路、奔跑、短衝、觀察、轉向及尾巴動作；低階層則套用有限角速度與角加速度、速度慣性、平滑加減速、連續漫遊及提前排斥邊界。9×9 造訪熱度圖與有界的近期目的地紀錄，會提高較少造訪之安全區域的取樣機會，但不強迫形成覆蓋循環。

完整動態狀態會在掃描相機開始轉場前凍結；掃描模式會隱藏小貓幾何與陰影。返回探索場景後，程式會精確還原時鐘、姿勢、動作、轉向狀態、造訪歷史、近期目的地、種子及隨機資料流狀態。QR 矩陣改變時，程式只會安全地重新投影已失效的目的地，同時保留世界座標位置與其餘工作階段狀態。

## 發行形式

多檔 Web 版、單檔 Web 版、Electron 桌面資產及 Windows 可攜式執行檔均由同一份原始碼建立。單檔 Web 與 Windows 入口皆可離線使用。v1.1.1 更新介面本地化、公開文件、展示圖片及發行中繼資料。產品機制與 v1.1.0 相同；角色模型、動態、QR 產生、掃描行為、相機控制、匯出及離線操作均維持不變。
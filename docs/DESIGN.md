[English](#english) | [繁體中文](#traditional-chinese)

<a id="english"></a>

# Design

## Design premise

VoxelQR Studio treats the QR matrix as both information and structure. Every theme uses the same canonical logical modules, while authored 3D geometry supplies a distinct silhouette, depth hierarchy, palette, and motion language. Decoration never changes the encoded bits or quiet zone.

## Theme identities

- Sakura, Summer Grove, Maple, Ginkgo, and Snow Pine use visibly different trunks, branch hierarchies, and canopy structures.
- Sunset presents a rounded pixel sun above a warm horizon.
- Ocean Waves combines directional bands at several scales.
- Pixel Wanderer is an original compact chibi rabbit with a visible face, two eyes, nose and mouth, two ears, body depth, four limbs, a complete neck scarf, side knot, and two short scarf tails.
- Voxel Kitty is an original orange-gold chibi cat with a visible face, two ears, chest, front-to-back body depth, short legs, and a separate raised tail. Natural actions include walking, running, short dashes, observing, turning, and tail movement.

## Interaction

- Explore and Scan are two camera states of the same WebGL scene.
- Free rotation, pan, and zoom never rewrite the encoded content.
- Scan freezes Kitty's complete movement and random-stream state, hides Kitty and its shadow, and keeps the QR colors. Returning to Explore restores the exact state and continues naturally.
- Atmospheric particles land on the current board, remain for 0.5–1.5 seconds, and fade without a visible below-board frame.

## Scale and public presentation

Scale grows monotonically with the effective QR board. Pixel Wanderer is a compact chibi character that scales proportionally with the QR board. In the standard Explore reference view, Voxel Kitty occupies about 8% of the board and scales proportionally as the QR matrix grows. Public character Scene images use a front or front three-quarter view that makes identity, depth, and important accessories immediately recognizable. A Scan image remains top-down because QR readability is its purpose.

English documentation uses screenshots of the English interface; Traditional Chinese documentation uses matching screenshots of the Traditional Chinese interface. Paired screenshots keep the same payload, viewport, character state, camera, and composition, with only the interface language changed.

<a id="traditional-chinese"></a>

# 設計

## 設計前提

VoxelQR Studio 同時把 QR 矩陣視為資訊與結構。每種主題都使用相同的權威邏輯模組，再由原創 3D 幾何提供不同的輪廓、深度層級、色盤與動態語言。裝飾永遠不會改變編碼位元或留白區。

## 主題身分

- 櫻花、盛夏綠蔭、楓葉、銀杏及雪松使用可清楚區分的樹幹、分枝層級與樹冠結構。
- 日落在暖色地平線上呈現圓潤的像素太陽。
- 海浪結合多種尺度且具有方向感的波帶。
- 像素旅兔是原創、精巧的可愛比例兔子，具備可見的臉部、雙眼、鼻口、雙耳、身體厚度、四肢、完整環頸圍巾、側結及兩條短圍巾尾端。
- Voxel Kitty 是原創橘金配色的可愛比例小貓，具備可見的臉部、雙耳、胸口、前後身體深度、短腿及與身體分離的翹尾。自然動作包含走路、奔跑、短衝、停下觀察、轉向與擺尾。

## 互動

- 探索與掃描是同一個 WebGL 場景的兩種相機狀態。
- 自由旋轉、平移與縮放永遠不會改寫編碼內容。
- 掃描模式會凍結小貓的完整動態與隨機資料流狀態，隱藏小貓和陰影，並保留 QR 色彩。返回探索場景後，程式會精確還原狀態並自然續播。
- 氣氛粒子會落到目前底板，停留 0.5～1.5 秒後淡出，且不會出現可見的底板下方畫面。

## 尺寸與公開展示

尺寸會隨有效 QR 底板單調增長。像素旅兔採用小巧的可愛比例，並會隨 QR 底板同比例縮放。在標準探索參考視角下，體素小貓約佔底板的 8%，也會隨 QR 矩陣增大而同比例放大。公開的角色場景圖使用正面或正面四分之三視角，讓角色身分、立體深度與重要配件能立即辨識。掃描圖則維持俯視，因其目的在驗證 QR 可讀性。

英文文件使用英文介面截圖；繁中文件使用相符的繁中介面截圖。成對圖片使用相同的編碼內容、視窗大小、角色狀態、相機與構圖，只有介面語言不同。
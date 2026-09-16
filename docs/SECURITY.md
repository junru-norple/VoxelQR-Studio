[English](#english) | [繁體中文](#traditional-chinese)

<a id="english"></a>

# Security and privacy

## Runtime privacy

- No API, analytics, telemetry, crash reporter, remote font, CDN, cloud database, or account is used.
- Entered content stays in memory and is never written to local storage.
- Local storage contains only language and theme preferences.
- Web validation permits only the application's own static origin and requires zero third-party requests.
- Single-file HTML and Windows validation require zero HTTP(S) requests.

## Browser policy

The Content Security Policy denies network connections, objects, frames, and form submission. Scripts and styles are local. Inline script and style are permitted only because the formal single-file HTML artifact contains the Vite bundle. Images are limited to local, data, or blob URLs for local export.

## Electron hardening

- `contextIsolation=true`
- `nodeIntegration=false`
- `sandbox=true`
- `webSecurity=true`
- no renderer IPC or context-bridge capability
- all permission checks and requests denied
- popups denied
- non-file navigation denied
- runtime request protocol allowlist
- no arbitrary shell execution
- no external URL opening from the desktop renderer

## Dependency audit

`npm audit` reported zero known vulnerabilities after Electron was upgraded to 43.4.1. Runtime libraries use MIT or ISC licenses. No native Node add-on is included. Version 1.1.1 adds or upgrades no dependency.

## Threat boundary

VoxelQR Studio encodes user-provided text. It does not browse to or retrieve that content. A QR scanner may later interpret an encoded URL; users should apply the same caution they would to any QR destination.

<a id="traditional-chinese"></a>

# 安全與隱私

## 執行階段隱私

- 不使用任何 API、分析、遙測、當機回報、遠端字型、CDN、雲端資料庫或帳號。
- 輸入內容只保留在記憶體中，絕不寫入本機儲存空間。
- 本機儲存空間只保存語言與主題偏好。
- Web 驗證只允許應用程式自身的靜態來源，並要求第三方請求為 0。
- 單檔 HTML 與 Windows 驗證都要求 HTTP(S) 請求為 0。

## 瀏覽器政策

內容安全政策會禁止網路連線、物件、框架與表單送出。程式碼與樣式都位於本機；只有因正式單檔 HTML 成品需包含 Vite 套件，才允許內嵌程式碼與樣式。圖片僅能使用本機、資料或 blob 網址，以供本機匯出。

## Electron 強化

- `contextIsolation=true`
- `nodeIntegration=false`
- `sandbox=true`
- `webSecurity=true`
- 渲染程序不具程序間通訊或 context bridge 能力
- 拒絕所有權限檢查與請求
- 拒絕彈出視窗
- 拒絕非檔案導覽
- 執行階段請求採通訊協定允許清單
- 不允許任意執行殼層命令
- 桌面渲染程序不會開啟外部網址

## 依賴稽核

Electron 升級至 43.4.1 後，`npm audit` 回報已知漏洞為 0。執行階段程式庫採 MIT 或 ISC 授權，且不包含原生 Node 附加元件。v1.1.1 未新增或升級任何依賴。

## 威脅邊界

VoxelQR Studio 只會編碼使用者提供的文字，不會前往或擷取該內容。QR 掃描器之後可能解讀編碼網址；使用者應採取與其他 QR 目的地相同的安全判斷。
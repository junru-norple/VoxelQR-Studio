export type Locale = 'zh-TW' | 'en';

const messages = {
  'zh-TW': {
    productName: '3D 動態體素 QR Code 生成器',
    tagline: '把內容種成一座漂亮、可探索、也能掃描的像素庭園。',
    controls: '3D 動態體素 QR Code 生成器', inputType: '內容類型', url: '網址', text: '文字', payload: '輸入網址或文字',
    payloadHintUrl: '例如 example.com', payloadHintText: '輸入任何中英文文字', encoded: '實際寫入',
    liveScene: '動態場景', scene: '探索場景', scan: '俯視掃描', reset: '符合視窗', exportQr: '匯出俯視', exportScene: '匯出場景',
    themes: '選擇庭園', language: '語言', offline: '完全離線', empty: '輸入內容後，庭園會立即生長。', needsInput: '等待內容',
    tooLong: '內容超過 600 個字元，請縮短後再試。', syncing: '正在生長', synchronized: '已即時更新', inputHelp: '輸入、貼上或刪除都會立即更新，不需要按下生成。',
    scanTip: '同一座彩色庭園，正平滑移向俯視', sceneTip: '左鍵自由旋轉 · 右鍵平移 · 滾輪縮放',
    sakura: '櫻花', summer: '夏樹', maple: '楓葉', ginkgo: '銀杏', snow: '雪樹', sunset: '夕陽', ocean: '海浪', wanderer: '像素旅兔',
    downloadedQr: '俯視圖片已匯出', downloadedScene: '場景圖片已匯出', close: '關閉',
  },
  en: {
    productName: 'Dynamic 3D Voxel QR Code Generator',
    tagline: 'Turn your content into a beautiful voxel scene you can explore and scan.',
    controls: '3D QR Code Converter', inputType: 'Content type', url: 'URL', text: 'Text', payload: 'Enter a URL or text',
    payloadHintUrl: 'Try example.com', payloadHintText: 'Enter English, Chinese, or mixed text', encoded: 'Encoded as',
    liveScene: 'LIVE SCENE', scene: 'Explore scene', scan: 'Top-down scan', reset: 'Fit view', exportQr: 'Export top view', exportScene: 'Export scene',
    themes: 'Choose a scene', language: 'Language', offline: 'Fully offline', empty: 'Enter content and the scene will appear immediately.', needsInput: 'Waiting for content',
    tooLong: 'This exceeds 600 characters. Shorten it and try again.', syncing: 'Growing', synchronized: 'Updated live', inputHelp: 'Typing, pasting, and deleting update immediately—there is no Generate step.',
    scanTip: 'The same colored scene is moving smoothly overhead', sceneTip: 'Left drag rotates · Right drag pans · Wheel zooms',
    sakura: 'Sakura', summer: 'Summer tree', maple: 'Maple', ginkgo: 'Ginkgo', snow: 'Snow tree', sunset: 'Sunset', ocean: 'Ocean waves', wanderer: 'Pixel Wanderer',
    downloadedQr: 'Top-down image exported', downloadedScene: 'Scene image exported', close: 'Close',
  },
} as const;

export type MessageKey = keyof (typeof messages)['en'];

export function t(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}

export function messageKeys(locale: Locale): string[] {
  return Object.keys(messages[locale]).sort();
}

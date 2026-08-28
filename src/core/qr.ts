import QRCode from 'qrcode';

export type PayloadType = 'url' | 'text';

export interface CanonicalQr {
  payload: string;
  size: number;
  matrix: boolean[][];
}

export const MAX_PAYLOAD_LENGTH = 600;
export const QUIET_ZONE = 4;

export function canonicalizePayload(raw: string, type: PayloadType): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (type === 'url' && !/^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function createCanonicalQr(raw: string, type: PayloadType): CanonicalQr {
  const payload = canonicalizePayload(raw, type);
  if (!payload) throw new Error('EMPTY_PAYLOAD');
  if ([...payload].length > MAX_PAYLOAD_LENGTH) throw new Error('PAYLOAD_TOO_LONG');

  const qr = QRCode.create(payload, { errorCorrectionLevel: 'H' });
  const size = qr.modules.size;
  const data = qr.modules.data;
  const matrix = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, column) => Boolean(data[row * size + column])),
  );
  return { payload, size, matrix };
}

export interface RgbaImage {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export function renderQrRgba(qr: CanonicalQr, modulePixels = 12, quietZone = QUIET_ZONE): RgbaImage {
  const sideModules = qr.size + quietZone * 2;
  const side = sideModules * modulePixels;
  const rgba = new Uint8ClampedArray(side * side * 4);
  rgba.fill(255);

  for (let row = 0; row < qr.size; row += 1) {
    for (let column = 0; column < qr.size; column += 1) {
      if (!qr.matrix[row][column]) continue;
      const startX = (column + quietZone) * modulePixels;
      const startY = (row + quietZone) * modulePixels;
      for (let y = 0; y < modulePixels; y += 1) {
        for (let x = 0; x < modulePixels; x += 1) {
          const offset = ((startY + y) * side + startX + x) * 4;
          rgba[offset] = 13;
          rgba[offset + 1] = 18;
          rgba[offset + 2] = 16;
          rgba[offset + 3] = 255;
        }
      }
    }
  }
  return { data: rgba, width: side, height: side };
}

export function paintQrCanvas(canvas: HTMLCanvasElement, qr: CanonicalQr, pixels = 1024): void {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('CANVAS_CONTEXT_UNAVAILABLE');
  const sideModules = qr.size + QUIET_ZONE * 2;
  const modulePixels = Math.max(1, Math.floor(pixels / sideModules));
  const side = modulePixels * sideModules;
  canvas.width = side;
  canvas.height = side;
  context.imageSmoothingEnabled = false;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, side, side);
  context.fillStyle = '#0d1210';
  for (let row = 0; row < qr.size; row += 1) {
    for (let column = 0; column < qr.size; column += 1) {
      if (qr.matrix[row][column]) {
        context.fillRect((column + QUIET_ZONE) * modulePixels, (row + QUIET_ZONE) * modulePixels, modulePixels, modulePixels);
      }
    }
  }
}

import { describe, expect, it } from 'vitest';
import { canonicalizePayload, createCanonicalQr, MAX_PAYLOAD_LENGTH } from '../../src/core/qr';

describe('canonical QR core', () => {
  it('normalizes a protocol-less URL and exposes the exact payload', () => {
    expect(canonicalizePayload(' example.com/path ', 'url')).toBe('https://example.com/path');
    expect(createCanonicalQr(' example.com/path ', 'url').payload).toBe('https://example.com/path');
  });

  it('preserves UTF-8 text exactly apart from surrounding whitespace', () => {
    const payload = '櫻花 Garden／春 2026';
    expect(createCanonicalQr(`  ${payload}  `, 'text').payload).toBe(payload);
  });

  it('is deterministic for identical canonical input', () => {
    const first = createCanonicalQr('https://example.com/?a=1#garden', 'url');
    const second = createCanonicalQr('https://example.com/?a=1#garden', 'url');
    expect(second.matrix).toEqual(first.matrix);
  });

  it('rejects empty and over-limit payloads', () => {
    expect(() => createCanonicalQr(' ', 'text')).toThrow('EMPTY_PAYLOAD');
    expect(() => createCanonicalQr('x'.repeat(MAX_PAYLOAD_LENGTH + 1), 'text')).toThrow('PAYLOAD_TOO_LONG');
  });
});

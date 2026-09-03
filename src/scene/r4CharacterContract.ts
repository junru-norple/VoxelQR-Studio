export const R4_WANDERER_LINEAR_SCALE = 0.7;
export const R4_KITTY_LINEAR_SCALE = 0.75;

// R3 contact planes are authoritative. R4 scales Y around these planes so
// the feet remain planted without changing either character's X/Z origin.
export const R3_WANDERER_FOOT_CONTACT_Y = 0.1;
export const R3_KITTY_FOOT_CONTACT_Y = 0.105;

export const R3_KITTY_VISUAL_X_SCALE = 1.29;
export const R3_KITTY_VISUAL_Y_SCALE = 1;
export const R3_KITTY_VISUAL_Z_SCALE = 0.85;
export const R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL = 14.4;

export function scaleCenterAboutContact(
  r3CenterY: number,
  contactY: number,
  linearScale: number,
): number {
  return contactY + (r3CenterY - contactY) * linearScale;
}

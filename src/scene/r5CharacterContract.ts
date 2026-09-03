import { R4_KITTY_LINEAR_SCALE } from './r4CharacterContract';

export const R5_KITTY_PROJECTED_SILHOUETTE_MIN = 0.07;
export const R5_KITTY_PROJECTED_SILHOUETTE_MAX = 0.09;
export const R5_KITTY_PROJECTED_SILHOUETTE_TARGET = 0.08;

// R5 preserves the accepted R4 authored cat and applies one additional uniform
// correction. The final value is verified by the production object-ID pass;
// screen-space AABBs are intentionally excluded from this contract.
export const R5_KITTY_LINEAR_SCALE_FROM_R4 = 0.38;
export const R5_KITTY_LINEAR_SCALE_FROM_R3 =
  R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4;

export const R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES = 4;
export const R5_KITTY_REFERENCE_PHYSICAL_BOARD_SIDE = 33 + R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES * 2;
export const R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL = 0.6;

export function r5KittyScaleForGrid(gridSize: number): number {
  if (!Number.isFinite(gridSize) || gridSize < 21) throw new Error('R5_KITTY_GRID_SIZE_INVALID');
  return (gridSize + R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES * 2) / R5_KITTY_REFERENCE_PHYSICAL_BOARD_SIDE;
}
export const R5_KITTY_MASK_CAMERA = 'r4-fixed-three-quarter-explore-camera' as const;
export const R5_KITTY_MASK_DENOMINATOR = 'full-physical-board-top-mask' as const;

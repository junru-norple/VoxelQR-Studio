# Design system

VoxelQR Studio treats the QR matrix as both information and structure. Every theme uses the same canonical logical modules, while authored 3D geometry supplies a distinct silhouette, depth hierarchy, palette, and motion language.

## Theme families

- Sakura, Summer Grove, Maple, Ginkgo, and Snow Pine use genuinely different trunk, primary-branch, secondary-branch, and canopy layouts.
- Sunset uses a volumetric voxel sun with a restrained orbiting atmosphere.
- Ocean Waves combines swell, crest, and ripple bands without changing logical QR occupancy.
- Pixel Wanderer is an original short, rounded 3D character with ten semantic parts and a bounded idle animation set. Its authored costume/body depth is shaped to preserve the real top-down silhouette, after which the complete character is uniformly scaled to 90%; surrounding scene accents remain unchanged.

## Interaction principles

- Live input updates the current scene without a Generate button.
- Scene and Scan are two camera states of the same WebGL scene.
- Free rotation, pan, and zoom never rewrite the encoded payload.
- Scan mode preserves color and motion phase while reducing motion amplitude for readability.
- Responsive layouts change presentation, not QR data or Hero geometry resolution.

## Visual constraints

Voxel sizes, rounded edges, controlled palette variation, and bounded animation are shared across themes. Decorative particles never contribute to the logical QR matrix or Hero-area measurements. Automatic performance fallback may reduce atmospheric particles only; it never coarsens Hero geometry or QR modules.

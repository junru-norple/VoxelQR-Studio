# Design system

VoxelQR Studio treats the QR matrix as both information and structure. Every theme uses the same canonical logical modules, while authored 3D geometry supplies a distinct silhouette, depth hierarchy, palette, and motion language.

## Theme families

- Sakura, Summer Grove, Maple, Ginkgo, and Snow Pine use genuinely different trunk, primary-branch, secondary-branch, and canopy layouts.
- Sunset uses a volumetric voxel sun with a restrained orbiting atmosphere.
- Ocean Waves combines swell, crest, and ripple bands without changing logical QR occupancy.
- Pixel Wanderer is an original rounded chibi rabbit with readable ears, face, body, limbs, tail, and a bounded Explore animation.
- Voxel Kitty is an original broad top-down chibi cat in orange, gold, cream, dark brown, and pink. Session-seeded high-level intent and smooth steering produce natural walking, running, short dashes, observation, turning, and tail motion without a fixed patrol loop.

## Interaction principles

- Live input updates the current scene without a Generate button.
- Scene and Scan are two camera states of the same WebGL scene.
- Free rotation, pan, and zoom never rewrite the encoded payload.
- Scan mode preserves color and the same scene. Voxel Kitty's complete motion and RNG snapshot freezes immediately, Kitty and its shadow are hidden, and the exact state resumes when Scene mode returns.
- Responsive layouts change presentation, not QR data or Hero geometry resolution.

## Visual constraints

Voxel sizes, rounded edges, controlled palette variation, and bounded animation are shared across themes. Hero area scales monotonically with the effective board: seven large compositions target 40%–50%, the rabbit 28%–35%, and Kitty 8%–12%. Decorative particles never contribute to the logical QR matrix or Hero-area measurements. They collide with the current board, settle for 0.5–1.5 seconds, and fade without a visible below-board frame. Automatic performance fallback may reduce atmospheric particles only; it never coarsens Hero geometry or QR modules.

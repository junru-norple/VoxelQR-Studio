# VoxelQR Studio v1.1.0 Architecture

`src/main.ts` owns the bilingual UI, live-input scheduler, theme selection, Scene/Scan state, export, and a validation-only runtime interface. `src/core/qr.ts` produces the one canonical QR matrix. `src/scene/VoxelGarden.ts` owns one persistent Three.js scene, orthographic camera, Arcball controls, renderer, lights, theme runtime pools, scan transition, performance counters, and atmosphere fallback. `src/scene/v8Hero.ts` builds and animates the semantic Hero data, while `src/scene/r6KittyNaturalMotion.ts` owns Kitty's session seed, serializable PRNG, high-level intent, steering, exploration heatmap, recent targets, and board-safe state.

All nine themes allocate body, dark-cap, light-cap, and particle `InstancedMesh` pools once. Payload changes rebuild deterministic instance data from the canonical matrix; theme changes only switch visibility and data. Scene, camera, canvas, geometry pools, materials, programs, and managed listener counts remain stable.

Dark/light QR caps are generated from the canonical logical module matrix. Each logical cell is subdivided visually into 2×2 micro-caps, but occupancy and color remain the original bit. Scene → Scan moves the same camera; it does not create an overlay, second canvas, synthetic QR, replacement scene, or scan-only recolor. Kitty's complete motion snapshot freezes before the camera transition; Kitty renderables and shadow are hidden in Scan, then restored with no clock, pose, intent, steering, heatmap, recent-target, seed, or RNG jump.

The production Hero grammar uses rounded micro-voxels. Trees store anchored/primary/secondary/canopy semantics; Sunset is a sampled micro-voxel sphere; Ocean stores three wave-band inputs per tile; Pixel Wanderer is authored as a rounded chibi rabbit; and Kitty is a broad top-down chibi silhouette made from original orange, gold, cream, dark, and pink voxel groups. Runtime metrics are derived from the actual production states.

Hero scale is derived from the effective QR grid size with a monotonic transition. The seven large themes are constrained to 40%–50% projected area, Pixel Wanderer to 28%–35%, and Kitty to 8%–12%, across both formal camera modes and all supported QR-size boundaries.

Kitty motion has no finite route or prescribed waypoint order. A fresh 128-bit cryptographic seed is created once per production launch and drives a serializable xoshiro128** stream. The high-level layer selects walk, run, dash, observe, turn, and tail intents within broad statistical bands. The low-level layer applies finite angular velocity, angular acceleration, speed inertia, smooth acceleration/deceleration, continuous wander, and early edge repulsion. A 9×9 visitation heatmap and bounded recent-target history bias sampling toward under-visited safe regions without forcing a coverage loop. Matrix changes reproject the current target while preserving world pose and session state.

Particles use deterministic analytic motion against the current board top. A particle falls, collides without a visible below-board frame, settles for 0.5–1.5 seconds, fades by scale and opacity, then restarts. The collision plane follows responsive board scaling.

Automatic fidelity fallback uses hysteresis: 90 sustained frames over 22 ms reduce only active atmospheric particle count to 58%; 300 frames below 17 ms restore it. Hero geometry, visible cell edge, logical QR resolution, and scan decoding never change.

The Windows and single-file Web release entry points are built from the same production source and carry the exact public name VoxelQR Studio.

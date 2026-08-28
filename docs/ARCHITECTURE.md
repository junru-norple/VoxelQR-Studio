# VoxelQR Studio v1.0.0 Architecture

`src/main.ts` owns the bilingual UI, live-input scheduler, theme selection, Scene/Scan state, export, and a validation-only runtime interface. `src/core/qr.ts` produces the one canonical QR matrix. `src/scene/VoxelGarden.ts` owns one persistent Three.js scene, orthographic camera, Arcball controls, renderer, lights, theme runtime pools, scan transition, performance counters, and atmosphere fallback. `src/scene/v8Hero.ts` builds and animates the high-detail semantic Hero data.

All eight themes allocate body, dark-cap, light-cap, and particle `InstancedMesh` pools once. Payload changes rebuild deterministic instance data from the canonical matrix; theme changes only switch visibility and data. Scene, camera, canvas, geometry pools, materials, programs, and managed listener counts remain stable.

Dark/light QR caps are generated from the canonical logical module matrix. Each logical cell is subdivided visually into 2×2 micro-caps, but occupancy and color remain the original bit. Scene → Scan moves the same camera and dampens production motion to 0.42; it does not create an overlay, second canvas, synthetic QR, replacement scene, or scan-only recolor.

The production Hero grammar uses a 0.36-unit rounded micro-voxel edge. Trees store anchored/primary/secondary/canopy semantics; Sunset is a sampled micro-voxel sphere; Ocean stores three wave-band inputs per tile; Pixel Wanderer stores ten original semantic groups. Pixel Wanderer's authored costume/body depth preserves a readable real silhouette before an exact 0.90 XYZ character transform is applied. Width, height, scene accents, particles, QR geometry, camera framing, rotation angles, and timing remain unchanged. Runtime metrics are derived from those actual production states.

Automatic fidelity fallback uses hysteresis: 90 sustained frames over 22 ms reduce only active atmospheric particle count to 58%; 300 frames below 17 ms restore it. Hero geometry, visible cell edge, logical QR resolution, and scan decoding never change.

The Windows and single-file Web release entry points are built from the same production source and carry the exact public name VoxelQR Studio.

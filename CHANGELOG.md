# Changelog

## 1.1.0 — Accepted (2026-09-02)

- Added the ninth Voxel Kitty theme with original orange, gold, cream, dark-brown, and pink voxel geometry plus natural walk, run, short-dash, observe, turn, and tail actions.
- Re-authored Pixel Wanderer as a complete rounded chibi rabbit while preserving its violet, cream, mint, and gold identity.
- Locked Voxel Kitty to the accepted R5 object-ID mask ratio `0.08016706` and transform `[0.36765, 0.285, 0.24225]` without changing the camera, board, model, materials, or raised rear tail.
- Added board-relative particle collision, 0.5–1.5 second settling/fade, and a zero-visible-below-board invariant.
- Replaced the rejected 44-second fixed Kitty patrol with a fresh 128-bit cryptographic session seed, high-level intent, smooth steering, visitation heatmap, recent-target penalties, and anti-repeat behavior.
- Extended Scan freeze/resume to preserve and restore intent, steering, heatmap, recent targets, session seed, RNG state, world pose, matrices, and motion clock exactly while hiding Kitty and its shadow completely.
- Passed 229 automated tests across 39 suites, Web QR 72/72, animated Scan 27/27, Web/single-file/Windows 9/9, and export 3,656/3,656 while preserving the historical 1,016/1,016 gate.
- Verified 30/30 distinct fixed-seed trajectories and target sequences, 10/10 distinct production launches, zero repeated 44-second cycles, all behavior-distribution bands, 79/81 heatmap cells plus every required board region, and exact fixed-seed replay.
- Re-audited 31 runtime packages under the existing MIT/ISC policy; no direct or transitive dependency changed from v1.0.0.
- Received explicit human acceptance before formal Repository promotion and local release packaging. True-destination Sync, commit, push, tag, GitHub Release, and asset upload remain manual and were not performed.

## 1.0.0 — VoxelQR Studio (2026-08-28)

- Shipped portable Windows 11 x64 and offline single-file Web applications with eight animated 3D themes.
- Retained the accepted exact 90% Pixel Wanderer character scale and corrected only authored character depth geometry needed for a true projected silhouette in range.
- Passed the strict 128/128 Hero-area matrix across 114,368 sampled frames, with 0 failures and 0 ratio exceptions.
- Passed 134 automated tests, Web QR 64/64, animated Scan 24/24, export 1016/1016, five-tree structure, offline runtime, license, branding, attribution, packaging, and containment gates.
- Published under the VoxelQR Studio name with verified Enzo Manuel Mangano design-reference acknowledgement and preserved upstream terms.
- Prepared local artifacts for manual GitHub upload; no remote, commit, push, tag, Release, asset upload, or Pages action was performed.

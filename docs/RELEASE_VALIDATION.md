# Release validation

Current local delivery status: `READY_FOR_MANUAL_GITHUB_UPLOAD_V1_0_0_ROOT_LAYOUT`

The corrected Pixel Wanderer candidate received a new exact `ACCEPTED` reply on 2026-08-28. The accepted, strictly validated program was then used to replace the previously frozen non-publishable root `Repository/` and `Versions/v1.0.0/` delivery contents. Publication itself remains a manual user action.

The v1.0.0 release was rebuilt and checked from a clean repository copy in a path containing CJK characters, spaces, and parentheses. Validation covered:

- ESLint and TypeScript: pass.
- Automated tests: 134 of 134 pass.
- Fresh Web, single-file Web, desktop, and Windows builds: pass.
- Web QR: 64 of 64 static cases, 24 of 24 animated Scan cases, and 8 of 8 runtime themes pass with zero runtime network requests.
- Single-file Web and Windows: 8 of 8 runtime themes pass with zero runtime network requests.
- Exact extracted release entry points: Web 8 of 8 and Windows 8 of 8 pass offline.
- Windows metadata: `VoxelQR Studio`, version `1.0.0`.
- License audit: 31 runtime packages pass.
- Repository/release manifests, companion checksum, and aggregate `SHA256SUMS_v1.0.0.txt`: verified.
- Project containment: one canonical worktree, zero remotes, the unintended legacy short root absent, and no project-created persistent item outside the canonical root. Machine PATH remained unchanged; User PATH differences were traced only to an unrelated SolidWorks project and were classified as an explicitly approved non-blocking external difference. VoxelQR Studio did not write or repair either PATH scope.

Pixel Wanderer retains an exact 0.90 XYZ character transform. Before that transform, only the character's authored costume/body depth is adjusted to preserve its real projected silhouette; QR geometry, camera framing, scene accents, particles, width, height, timing, and measurement rules are unchanged.

The production Hero-area release Gate is absolute: all 128 of 128 rows and all 114,368 sampled animation frames must remain within `0.40 ≤ silhouette union / active QR projection ≤ 0.50`. Any failed row blocks aggregate validation, release building, repository promotion, and publication. Ratio exceptions are not permitted.

The prior frozen ZIP with SHA-256 `3eb429d64a0f275fef6ff468ee8706a5af7955d3e20841c4e0ae49f451616209` was superseded after targeted acceptance. It is not a valid checksum for the final local v1.0.0 delivery.

Future release ZIP:

- `Versions/v1.0.0/VoxelQR-Studio-v1.0.0.zip`
- Its authoritative SHA-256 must be generated from the rebuilt artifact and recorded beside it in `VoxelQR-Studio-v1.0.0.zip.sha256`.

No Git remote, push, upload, GitHub Release, or Pages configuration was performed. Publication remains a manual user action.

## Canonical accepted-delivery layout

- `_workspace/` is limited to candidate builds, validation, evidence, caches, and temporary staging.
- Root `Repository/` is the single latest accepted, clean GitHub source snapshot; its direct contents are copied into the user's GitHub working folder.
- Root `Versions/vX.Y.Z/` stores only accepted release assets, checksums, manifests, notes, and the manual upload checklist. It never contains a duplicate Repository.
- Once a version has been publicly released, its `Versions/vX.Y.Z/` directory is immutable; a correction requires a new version.
- Release ZIPs and executables are never committed into the source repository.
- GitHub remote configuration, commits, pushes, tags, Releases, asset uploads, and Pages remain manual unless separately authorized.

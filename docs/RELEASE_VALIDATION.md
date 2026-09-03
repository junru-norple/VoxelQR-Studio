# Release validation

Current v1.1.0 state: explicit human acceptance was received after the R6 natural-motion correction and all formal local gates passed. Repository promotion and local release packaging are authorized; remote publication remains manual.

The candidate was built and checked in the canonical project path containing CJK characters, spaces, and parentheses. Final R6 validation on 2026-09-02 covered:

- ESLint and TypeScript: pass.
- Automated tests: 229 of 229 pass across 39 of 39 suites, retaining every earlier test.
- Fresh Web, single-file Web, desktop, and Windows builds: pass.
- Web QR: 72 of 72 static cases, 27 of 27 animated Scan cases, and 9 of 9 runtime themes pass with zero third-party requests.
- Single-file Web and Windows: 9 of 9 themes pass offline with zero HTTP(S) requests.
- Voxel Kitty visual lock: object-ID mask ratio `0.08016706` and transform `[0.36765, 0.285, 0.24225]`, with the R5 camera, board, model, and shadow unchanged.
- Particle collision: zero visible below-board frames; settling remains within 0.5–1.5 seconds before fade/recycle.
- Kitty natural motion: 30 of 30 fixed-seed trajectories and target sequences are distinct; 10 of 10 production launches have distinct cryptographic seeds and trajectories; zero of 30 sessions repeat a 44-second cycle; all behavior, smoothness, safety, coverage, replay, and payload-continuity gates pass.
- Kitty Scan: all six intents preserve the complete motion/RNG snapshot exactly; Kitty renderables remain zero and full-frame/QR-ROI no-cat pixel difference remains zero.
- Export: 3,656 of 3,656 fixed 1001×1001 captures decode, preserving the historical 1,016 of 1,016 sweep and adding 2,640 natural Kitty samples.
- License audit: 31 runtime packages pass the existing MIT/ISC policy; dependencies and notices are unchanged from v1.0.0.

The immutable `Versions/v1.0.0/` delivery remains unchanged. The accepted v1.1.0 public Repository and release assets are locally prepared with manifest, extraction, privacy, attribution, license, and checksum verification before manual publication.

No commit, push, tag, GitHub Release, asset upload, remote configuration, or Pages action was performed. Publication remains a manual user action after acceptance and formal packaging.

## Canonical accepted-delivery layout

- `_workspace/` is limited to candidate builds, validation, evidence, caches, and temporary staging.
- Root `Repository/` is the single latest accepted, clean GitHub source snapshot; its direct contents are copied into the user's GitHub working folder.
- Root `Versions/vX.Y.Z/` stores only accepted release assets, checksums, manifests, notes, and the manual upload checklist. It never contains a duplicate Repository.
- Once a version has been publicly released, its `Versions/vX.Y.Z/` directory is immutable; a correction requires a new version. `Versions/v1.0.0/` is therefore read-only during v1.1.0 work.
- Release ZIPs and executables are never committed into the source repository.
- GitHub remote configuration, commits, pushes, tags, Releases, asset uploads, and Pages remain manual unless separately authorized.

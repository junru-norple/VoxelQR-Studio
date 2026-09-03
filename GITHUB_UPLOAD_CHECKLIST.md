# VoxelQR Studio v1.1.0 — Post-acceptance Manual GitHub Upload Checklist

The v1.1.0 candidate received explicit human acceptance and was promoted into the formal Project Root delivery before this checklist was issued. Codex did not create or modify a remote, commit, push, tag, publish a Release, upload an asset, or enable Pages.

1. Run the private CheckOnly workflow against the GitHub working folder. Stop if it reports staged, unstaged, untracked, or ignored content outside `.git`.
2. After reviewing the exact delete/copy list, the user may run the private Sync workflow. Copy only the direct contents of `<PROJECT_ROOT>\Repository\`; do not create a nested `Repository` directory.
3. Confirm that `.git` is preserved and source/destination relative paths, byte sizes, and SHA-256 values match.
4. In GitHub Desktop, confirm that `_workspace`, `Repository`, `Versions`, `node_modules`, executables, release ZIPs, private references, evidence, handoff documents, sync tooling, and local absolute paths are absent.
5. Review, commit, and push the source manually.
6. Create the GitHub tag and Release `v1.1.0` manually.
7. From `<PROJECT_ROOT>\Versions\v1.1.0\`, upload `VoxelQR-Studio-v1.1.0.zip` and `VoxelQR-Studio-v1.1.0.zip.sha256` only after verifying the recorded byte size and SHA-256.
8. Never commit `Versions`, `.exe`, the release ZIP, or `node_modules` into the source repository.

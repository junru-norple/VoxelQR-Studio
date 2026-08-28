# VoxelQR Studio v1.0.0 — Manual GitHub Upload Checklist

The validated canonical delivery is stored at the Project Root. Codex did not create or modify a remote, commit, push, tag, publish a Release, upload an asset, or enable Pages.

1. Copy the direct contents of `<PROJECT_ROOT>\Repository\` into the GitHub working folder for `VoxelQR-Studio`. Do not copy `Repository` as a nested directory.
2. In GitHub Desktop, confirm that `.git`, `_workspace`, `Repository`, `Versions`, `node_modules`, executables, release ZIPs, private references, evidence, archives, and local absolute paths are absent.
3. Review, commit, and push the source manually.
4. Create the GitHub tag and Release `v1.0.0` manually.
5. From `<PROJECT_ROOT>\Versions\v1.0.0\`, upload `VoxelQR-Studio-v1.0.0.zip` and `VoxelQR-Studio-v1.0.0.zip.sha256`.
6. Verify the ZIP SHA-256 against the companion checksum before upload.
7. Never commit `Versions`, `.exe`, the release ZIP, or `node_modules` into the source repository.

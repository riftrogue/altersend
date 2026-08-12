#!/bin/bash
set -e

# This script generates the required node-modules.json and package-lock.flatpak.json 
# files used by the Flatpak builder. Since flatpak-node-generator does not natively
# support nested NPM Workspaces, this script temporarily flattens the lockfile.

echo "Flattening package-lock.json..."
python3 scripts/flatten-lockfile.py > flatpak/package-lock.flatpak.json

echo "Running flatpak-node-generator..."
# Note: You need to have flatpak-node-generator installed (e.g. pipx install flatpak-node-generator)
flatpak-node-generator npm flatpak/package-lock.flatpak.json -o flatpak/node-modules.json

echo "Done! The flatpak dependencies have been successfully updated."

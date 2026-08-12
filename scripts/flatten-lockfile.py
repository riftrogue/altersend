import json
import sys

def main():
    try:
        with open('package-lock.json', 'r') as f:
            lockfile = json.load(f)
    except FileNotFoundError:
        print("Error: package-lock.json not found.", file=sys.stderr)
        sys.exit(1)

    if 'packages' not in lockfile:
        print("Error: 'packages' field not found in lockfile. Ensure it's a v3 lockfile.", file=sys.stderr)
        sys.exit(1)

    packages = lockfile['packages']
    flattened_packages = {}

    for path, data in packages.items():
        if path == "":
            flattened_packages[path] = data
            continue
        
        # If the path starts with 'node_modules/', keep it relative to the root node_modules
        if path.startswith('node_modules/'):
            flattened_packages[path] = data
            continue

        # If it's a workspace package dependency (e.g. apps/desktop/node_modules/vite),
        # we move it to the root node_modules so flatpak-node-generator finds it.
        if '/node_modules/' in path:
            parts = path.split('/node_modules/')
            new_path = 'node_modules/' + parts[-1]
            if new_path not in flattened_packages:
                flattened_packages[new_path] = data

    # Update lockfile with flattened packages structure
    lockfile['packages'] = flattened_packages

    # Write output to stdout
    print(json.dumps(lockfile, indent=2))

if __name__ == "__main__":
    main()

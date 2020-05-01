#!/bin/sh

# Change the current directory to the extension files directory
cd ./../extension/ || exit

# Get version name
VERSION_RAW=$(jq '.version' manifest.json)
# Replace dots with underscores
VERSION_UNDERSCORE=${VERSION_RAW//./_}
# Remove double quotes
VERSION=${VERSION_UNDERSCORE//\"/}

# Zipping
zip -r "./../scripts/New_tab_extension_${VERSION}.zip" * -x "*.DS_Store"

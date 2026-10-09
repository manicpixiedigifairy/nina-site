#!/bin/sh
# Netlify sets SITE_NAME to the project's name during every build.
set -e
rm -rf dist
case "$SITE_NAME" in
  portfoliogiveaway)
    mkdir -p dist
    cp -R giveaway/. dist/
    rm -f dist/README.md
    printf '/work  /work/  301\n' > dist/_redirects
    ;;
  *)
    python3 site/build.py
    mv site/dist dist
    ;;
esac
echo "Built $SITE_NAME"

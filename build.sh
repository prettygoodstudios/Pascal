#!/bin/sh

rm -rf ./dist
npx webpack --config webpack.config.js --mode production
cp index.html ./dist
cp manifest.webmanifest ./dist
mkdir ./dist/src
cp -r ./src/images ./dist/src

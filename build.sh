#!/bin/bash

set -e

packageVersion=$(cat package.json | jql -r '"version"')
packageName=$(cat package.json | jql -r '"name"')

if [[ $1 = "--release" ]]; then
    echo "==================================="
    echo "********Release Build**************"
    echo "==================================="
    echo $packageName
    echo $packageVersion
    output=~/Downloads/$packageName-v$packageVersion.aab
    rm -rf ./android/app/src/main/res/drawable-*
    rm -rf ./android/app/src/main/res/raw
    cd android
    ./gradlew clean
    cd ..
    (npm start)&
    sleep 10
    npx react-native build-android --mode=release
    cp android/app/build/outputs/bundle/release/app-release.aab $output
    pid=$(ps aux | grep npm | grep -v 'grep' | awk '{print $2}')
    kill $pid
else 
    echo "==================================="
    echo "********Debug Build**************"
    echo "==================================="
    echo $packageName
    echo $packageVersion
    output=~/Downloads/$packageName-debug-v$packageVersion.apk
    npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
    cd android
    ./gradlew clean
    ./gradlew assembleDebug
    cp app/build/outputs/apk/debug/app-debug.apk $output
fi
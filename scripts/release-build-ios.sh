#!/bin/sh

react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
read  -n 1 -p "Build archive (Step 1: Product > Build | Step 2: Product > Archive ) from xcode and press enter:" mainmenuinput
xcodebuild -exportArchive -exportOptionsPlist ios/Comet/info.plist -archivePath ios/build/archives/Comet.xcarchive -exportPath ios/build/ipas
echo "Build generated"
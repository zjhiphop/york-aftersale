#!/bin/bash
target="$1"
VERSION="$2"
FIR_TOKEN='f1842f3fe91dc1137016fa524e018a66'

if [ $target == "ios" ]
then
    react-native bundle --dev false --entry-file dist/App.js --bundle-output ios/main.jsbundle --platform ios;

    cd ios;
    /usr/libexec/PlistBuddy -c "SET :CFBundleVersion ${VERSION}" ./aftersale/Info.plist
    echo Start to build IOS: $VERSION 

    xcodebuild archive -project aftersale.xcodeproj -scheme aftersale -configuration Release -archivePath dist/aftersale.archive
    xcodebuild -exportArchive -exportOptionsPlist build.plist -archivePath dist/aftersale.archive.xcarchive -exportPath dist
    fir publish 'dist/bolang-app.ipa' -T $FIR_TOKEN -c "build verson ${VERSION}"

    cd ..
else
    react-native bundle --dev false --entry-file dist/App.js --bundle-output android/main.jsbundle --platform android;
    
    cd android;
    echo Start to build Android: $VERSION 

	./gradlew assembleRelease
    fir publish 'app/build/outputs/apk/app-release.apk' -T $FIR_TOKEN -c "build verson ${VERSION}"

    cd ..
fi

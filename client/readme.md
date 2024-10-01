## Quick Links

- [Expo Community Notes](https://github.com/expo/fyi)
- [Expo Library Reference](https://docs.expo.dev/workflow/using-libraries/)
- [React Native Directory](https://reactnative.directory/)
- [Expo Installable Libraries](https://docs.expo.dev/versions/latest/)
- [Expo Config Plugins](https://docs.expo.dev/config-plugins/introduction/)
  [Expo Docs](https://docs.expo.dev/)

## Update Expo

- [reference](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- `npm install expo@latest`
- `npx expo install --fix`
- `npm install -g eas-cli`

## Run

- `npm i`
- `eas build --platform android --profile development` (dowmload the dev build in releases)
- Install on native device
- `npx expo start`
- Connect to the same network or hotspot and scan qr using any app. Paste the link you get with the qr in the development build.

## Generate Dev Build

- delete eas id from [app.json](/app.json)
- generate a [development build](https://docs.expo.dev/develop/development-builds/use-development-builds/) using `eas build --platform android --profile development`
- Run development build by using adb reverse tcp:8081 tcp:8081
- prebuild android & ios using: `npx expo prebuild`, only for niche cases

## Generate Distribution Build

- Get APK build - `eas build --platform android --profile local`
- Get Distribution build using `eas build --platform android --profile production`

## Design System

This repo uses [React Native Paper](https://callstack.github.io/react-native-paper/) as its design system using material design.

- [Adaptive Icon Maker](https://icon.kitchen/i/H4sIAAAAAAAAA02PwQqDMAyG3yW7etlteJUdd1LYYYwRm1SL1bpWp0N896Udg7WQkC%2F5yZ8NXmhnDpBvQOi7quWeIddoA2egm8KaEf0U24ElAbHG2U6QgVFuEIBEj9qtsMfx6j2KGkyPDcuIAF6j6ipF3RTOOi%2FVQaeXWNlikoTnbLyyX9VZa1aTmILQIrklwVKhNUMjUPEwsU%2FwgqH7t%2FvbcKKj%2FGiqdzTbeOANcCDvDEXvLkhcuIb7%2FgGFJHJIAwEAAA%3D%3D)
- [Theme Maker](https://callstack.github.io/react-native-paper/docs/guides/theming/#creating-dynamic-theme-colors): Use this to replace src/constants/Colors.jsx to suit the app theme
- [React Native Paper Components](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator/)
- React Native Paper uses these [icons](https://static.enapter.com/rn/icons/material-community.html) internally

## Notes

### Expo Dev Builds

- Need to rebuild development builds when using packages with Native code. [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/) uses Native Code (Java/Kotlin for Android & Objective-C/Swift for iOS).
- For External Libraries use npx expo install [package-compatible-with-expo]
- To know if it is a Native Code package on Expo, they usually have android or ios badge to indicate platform dependance. For a third party library, refer to [React Native Directory](https://reactnative.directory/) and check if it has an expo go tag on it. [Expo Library Reference](https://docs.expo.dev/workflow/using-libraries/) has all the questions which if answered yes, would need you to make a new development build.
- If any permission is required, it needs to be changed in app.json -> expo -> plugins. This is termed [Config Plugins](https://docs.expo.dev/config-plugins/introduction/)

### Sharing Dev Builds

For projects with similiar Native Code package dependencies, the custom Dev Build/Client can be used for the projects. Download from the releases section

### Template Dev Build

This dev build uses [[Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/), [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/#installation), [Expo Document Picker](https://docs.expo.dev/versions/latest/sdk/document-picker/), [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/), [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/), [Expo Print](https://docs.expo.dev/versions/latest/sdk/print/), [Expo Share](https://docs.expo.dev/versions/latest/sdk/sharing/),[React Native Async Storage](https://react-native-async-storage.github.io/async-storage/docs/install/) [NetInfo](https://github.com/react-native-netinfo/react-native-netinfo)] as native code dependancies, could potentially reuse the Template dev client for future projects.

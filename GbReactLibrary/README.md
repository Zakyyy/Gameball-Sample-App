
# react-native-gameball

## Getting started

`$ npm install --save react-native-gameball`

#### iOS
1. cd ios  -- navigate to the IOS directory in the project
2. pod install
3. cd .. 


#### Android
after installing the package
open path/to/project/android/app/build.gradle file
android {
  ...
  sourceSets {
    `main { assets.srcDirs = [‘src/main/assets’, ‘../../html’] }`
  }
}

## installation issues
# IOS issues:
rnc webview was not found in the uimanager ios
sol:
1. check that react-native-webview is installed and in package.json if not install it `npm install --save react-native-webview`
if not solved
2. cd ios
3. pod install

if the issue still there:
in the project directory run: `react-native link react-native-webview`

## Usage
```javascript
import {GameballWidget, GameballSdk, InAppNotification} from 'react-native-gameball';

```
  
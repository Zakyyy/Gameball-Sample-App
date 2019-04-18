
# react-native-gb-react-library

## Getting started

`$ npm install react-native-gb-react-library --save`

### Mostly automatic installation

`$ react-native link react-native-gb-react-library`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-gb-react-library` and add `RNGbReactLibrary.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNGbReactLibrary.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNGbReactLibraryPackage;` to the imports at the top of the file
  - Add `new RNGbReactLibraryPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-gb-react-library'
  	project(':react-native-gb-react-library').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-gb-react-library/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-gb-react-library')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNGbReactLibrary.sln` in `node_modules/react-native-gb-react-library/windows/RNGbReactLibrary.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Gb.React.Library.RNGbReactLibrary;` to the usings at the top of the file
  - Add `new RNGbReactLibraryPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNGbReactLibrary from 'react-native-gb-react-library';

// TODO: What to do with the module?
RNGbReactLibrary;
```
  
import React from 'react';
import FirstScreen from './Screens/1';
import SecondScreen from './Screens/2';
import ThirdScreen from './Screens/3';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from "react-navigation";
import LoadingScreen from './Screens/LoadingScreen';
import { Icon } from 'react-native-elements';
import FourthScreen from './Screens/4';

const BottomNavigator = createBottomTabNavigator({
  SecondScreen: {
    screen: SecondScreen,
    navigationOptions: {
      title: "Rewards",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="star"
          color={tintColor}
          type='font-awesome'
          size={20}
        />
      )
    },
  },
  ThirdScreen: {
    screen: ThirdScreen,
    navigationOptions: {
      title: "Event",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="exclamation"
          color={tintColor}
          type='font-awesome'
          size={20}
        />
      )
    },
  },
}
  // , {
  //   tabBarOptions: {
  //     style: {
  //       width: '100%',
  //       position: 'absolute',
  //       zIndex: 1,
  //     }
  //   }
  // }
)

const AppNavigator = createSwitchNavigator(
  {
    Links: { screen: FirstScreen, navigationOptions: { header: null } },
    Loading: {
      screen: LoadingScreen,
      navigationOptions: {
        header: null
      }
    },
    App: BottomNavigator,
    SetClient: FourthScreen
  },
  {
    initialRouteName: 'SetClient',
  },
)

export default createAppContainer(AppNavigator);
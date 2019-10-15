import { createBottomTabNavigator } from 'react-navigation-tabs';
import FirstScreen from './Screens/1';
import SecondScreen from './Screens/2';
import ThirdScreen from './Screens/3';
import FourthScreen  from './Screens/4';
import {  createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

const FirstScreenStack = createStackNavigator({
  FirstScreen:{
    screen: FirstScreen
  },
  FourthScreen: {
    screen: FourthScreen
  }
})
const BottomNavigator = createBottomTabNavigator({
  FirstScreen: {
    screen: FirstScreenStack,
    navigationOptions: {
      title:"1"
    },
  },
  SecondScreen: {
    screen: SecondScreen,
    navigationOptions: {
      title:"2"
    },
  },
  ThirdScreen: {
    screen: ThirdScreen,
    navigationOptions: {
      title:"3"
    },
  },
})

export default createAppContainer(BottomNavigator);
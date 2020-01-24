import React, { Component } from 'react';
import AppNavigation from './src/Navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { GameballWidget } from 'react-native-gameball';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers/index';
import NotificationComponent from './src/NotificationComponent';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {

  async componentDidMount() {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <AppNavigation />
        <NotificationComponent />
      </Provider>
    )
  }
}

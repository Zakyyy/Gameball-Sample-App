import React, { Component } from 'react';
import AppNavigation from './src/Navigation';
import * as pushNotifications from './src/NotificationsService';
export default class App extends Component {
  componentDidMount(){
    pushNotifications.configure();
  }
  render() {

    return (
      <AppNavigation />
    )
  }
}

import React, { Component } from 'react';
import AppNavigation from './src/Navigation';
import * as pushNotifications from './src/NotificationsService';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers/index';
import NotificationComponent from './src/NotificationComponent';
export default class App extends Component {

  componentDidMount() {
    pushNotifications.configure();
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <AppNavigation />
        {/* <NotificationComponent />  */}
      </Provider>
    )
  }
}

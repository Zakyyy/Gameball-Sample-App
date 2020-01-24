import {combineReducers} from 'redux';
import NotificationReducer from './NotificationReducer';
import AuthReducer from './AuthReducer';
export default combineReducers({
  notification: NotificationReducer,
  auth: AuthReducer
});
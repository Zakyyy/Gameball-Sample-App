import {combineReducers} from 'redux';
import NotificationReducer from './NotificationReducer';
export default combineReducers({
  notification: NotificationReducer,
});
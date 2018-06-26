import { combineReducers } from 'redux';
import checkLogin from '../Login/reducer';
import { reducer as NotificationsReducer } from '../../notifications/reducer';

export default combineReducers({ 
    checkLogin : checkLogin ,
    message : NotificationsReducer
});


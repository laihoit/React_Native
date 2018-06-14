import { combineReducers } from 'redux';
import checkLogin from '../Login/reducer';
import { reducer as Persistreducer} from './reducer';

export default combineReducers({ 
    persist :  Persistreducer,
    checkLogin : checkLogin 
});


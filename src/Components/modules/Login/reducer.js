import createReducer from '../redux/createReducer';
import * as types from '../config/actionTypes';

const initialState = {
    isLoggedIn: false,
    user: '',
}; 

export default reducer = createReducer(initialState , {
    [types.Check.CHECK_LOGIN]( state, action ){
        return {
            ...state,
            isLoggedIn: action.action.isLoggedIn,
            user: action.action.user,
        }
    }
})
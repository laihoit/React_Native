import * as types from '../config/actionTypes'

export function setLoginState(status) {
    return function (dispatch) {
        return dispatch(loginState(status));
    };
}

export function loginState(state) {
    return { 
        type: types.Check.CHECK_LOGIN,
        action: {
            isLoggedIn: state.isLoggedIn,
            user: state.user,
        }
    };
} 
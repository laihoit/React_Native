import * as types from '../config/actionTypes';
import createReducer from './createReducer';


export const initialState = {
	isHydrated: false,
};
export const resetState = {
    isHydrated: true,
}

export const reducer = createReducer(initialState, {
    [types.REHYDRATE] (state, action) {        
        return {...state, persistedState: action.payload};
    },
    [types.RESET_STORE] (state) {        
        return resetState;
    }
});
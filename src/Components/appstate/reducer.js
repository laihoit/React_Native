import createRudecer from '../modules/redux/createReducer';
import * as types from '../modules/config/actionTypes';
import { Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');
const initialState = { currentState : 'active', root: 'login', orientation : width > height ? 'landscape' : 'portrait', dimensions: { height: height, width : width }};

export const reducer = createRudecer(initialState, {
    [types.AppState.CHANGE_ORIENTATION](state, action) {
        if(action.orientation !== 'portrait' && action.orientation !== 'landscape'){
            action.orientation = 'portrait';
        }

        var dimensions = action.dimensions ? action.dimensions : {
            width : Dimensions.get('window').width,
            height : Dimensions.get('window').height
        }

        return {
            ...state,
            orientation : action.orientation,
            dimensions : dimensions
        }
    }
})
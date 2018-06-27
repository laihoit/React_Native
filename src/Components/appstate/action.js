import * as types from '../modules/config/actionTypes';

export function changeOrientation(orientation, dimensions = null){
    return {
        type : types.AppState.CHANGE_ORIENTATION,
        orientation: orientation,
        dimensions : dimensions
    }
}
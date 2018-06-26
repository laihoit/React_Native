import * as types from '../modules/config/actionTypes';

// export const reducer = (state = [], action) => {
//     switch (action.type) {
//         case types.Notifications.ADD_NOTIFICATION:
//             const index = state.indexOf(action.message) 
//             if (index === -1) {
//                 return [action.message].concat(state);
//             }
//         case types.Notifications.REMOVE_NOTIFICATION:
//             const i = state.indexOf(action.message)
//             if (i > -1) {
//                 state.splice(i, 1);
//                 return state.concat([]);
//             }
//         case types.Notifications.CLEAR_NOTIFICATION:
//             return [];
//             break;
//         default:
//             return state;
//     }
// }

export const reducer = (state = null, action) => {
    switch (action.type) {
        case types.Notifications.ADD_NOTIFICATION:
            return action.message;
        case types.Notifications.REMOVE_NOTIFICATION:
            return null;
        default:
            return state;
    }
}
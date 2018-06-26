import * as types from '../modules/config/actionTypes';


export const addNotification = (message) => {
    return {
        type: types.Notifications.ADD_NOTIFICATION,
        message
    }
}

export const removeNotification = () =>{
    return {
        type : types.Notifications.REMOVE_NOTIFICATION,
       
    }
}
import * as firebase from 'firebase';

class Helper {
    static setUserName(userId, name){
        let userNamePath = "/user/"+userId+"/details/name"
        return firebase.database().ref(userNamePath).set(name)
    }
    static setUserPass(userId, pass){
        let userNamePath = "/user/"+userId+"/details/pass"
        return firebase.database().ref(userNamePath).push(pass)
    }
    static setUserPlacelat(userId, latitude){
        let userNamePath = "/user/"+userId+"/details/latitude"
        return firebase.database().ref(userNamePath).push(latitude)
    }
    static setUserPlacelong(userId, longitude){
        let userNamePath = "/user/"+userId+"/details/longitude"
        return firebase.database().ref(userNamePath).push(longitude)
    }
    static setImageUrl(userId, url){
        let userNamePath = "/user/"+userId+"/details/url"
        return firebase.database().ref(userNamePath).push(url)
    }
}
module.exports = Helper ;
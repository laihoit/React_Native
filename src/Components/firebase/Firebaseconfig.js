import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAfrhvi60KJ0u9PM4Qd_UDcSoONyKm9VaU",
    authDomain: "khoaluan-7653a.firebaseapp.com",
    databaseURL: "https://khoaluan-7653a.firebaseio.com",
    projectId: "khoaluan-7653a",
    storageBucket: "khoaluan-7653a.appspot.com",
    messagingSenderId: "500407728645"
  };
  
  export const firebaseApp = firebase.initializeApp(config);
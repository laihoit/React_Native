import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './src/navigation';
import store from './src/Components/modules/redux/store';
import DB from './src/Components/database/DB';

registerScreens(store, Provider);

class AppContainer {
  onStoreUpdate() {
    var state = store.getState();
    if(state.checkLogin.isLoggedIn){
      Navigation.startSingleScreenApp({
        screen:{
          screen : 'Home',  
          title:'Albums',
        }, 
        drawer: {
          left:{
            screen : 'Drawer' 
          } 
        }
      })
  
    }else {
      Navigation.startSingleScreenApp({
        screen:{
          screen : 'SignIn',
          title:'SignIn',
          navigatorStyle:{
            navBarHidden: true
          },
        },   
        drawer: {  
          left:{
            screen : 'Drawer'
          }
        }
      })
    }
  }

	constructor() {
    DB.loadAndQueryDB();
    store.subscribe(this.onStoreUpdate.bind(this));
	}
}

export default AppContainer;

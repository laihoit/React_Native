import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/navigation';

import DB from './src/Components/database/DB';

registerScreens();

DB.loadAndQueryDB();

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


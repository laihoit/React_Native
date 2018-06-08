import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/navigation';

registerScreens();

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


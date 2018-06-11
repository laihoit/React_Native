import { Navigation } from 'react-native-navigation';
import Home from '../Components/Home';
import HomeUser from '../Components/HomeUser';
import Drawer from '../Components/drawer/Drawer';
import SignIn from '../Components/Authentication/SignIn';
import SignUp from '../Components/Authentication/SignUp';
import MyMap from '../Components/Map/Mymap';
import User from '../Components/User';
import DetailUser from '../Components/DetailUser';

export function registerScreens(){
    Navigation.registerComponent('Home', () => Home);
    Navigation.registerComponent('HomeUser', () => HomeUser);
    Navigation.registerComponent('SignIn', ()=> SignIn);
    Navigation.registerComponent('SignUp', ()=> SignUp);
    Navigation.registerComponent('Drawer', () => Drawer);
    Navigation.registerComponent('MyMap', ()=> MyMap);
    Navigation.registerComponent('User', ()=> User);
    Navigation.registerComponent('DetailUser', ()=> DetailUser)
}
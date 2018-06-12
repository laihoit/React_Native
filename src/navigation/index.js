import { Navigation } from 'react-native-navigation';
import Home from '../Components/Home';
import HomeUser from '../Components/HomeUser';
import Drawer from '../Components/drawer/Drawer';
import SignIn from '../Components/Authentication/SignIn';
import SignUp from '../Components/Authentication/SignUp';
import MyMap from '../Components/Map/Mymap';
import User from '../Components/User';
import Detail from '../Components/Detail';
import ForgetPass from '../Components/Authentication/ForgetPass';
import UpdatePass from '../Components/Authentication/UpdatePass';

export function registerScreens(){

    Navigation.registerComponent('Home', () => Home);
    Navigation.registerComponent('HomeUser', () => HomeUser);
    Navigation.registerComponent('SignIn', ()=> SignIn);
    Navigation.registerComponent('SignUp', ()=> SignUp);
    Navigation.registerComponent('Drawer', () => Drawer);
    Navigation.registerComponent('MyMap', ()=> MyMap);
    Navigation.registerComponent('User', ()=> User);
    Navigation.registerComponent('DetailUser', ()=> Detail);
    Navigation.registerComponent('ForgetPass', ()=> ForgetPass);
    Navigation.registerComponent('UpdatePass', ()=> UpdatePass);

}
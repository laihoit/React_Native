import { Navigation } from 'react-native-navigation';

import Home from '../Components/screen/Home';
import HomeUser from '../Components/screen/HomeUser';
import Drawer from '../Components/drawer/Drawer';
import SignIn from '../Components/Authentication/SignIn';
import SignUp from '../Components/Authentication/SignUp';
import MyMap from '../Components/Map/Mymap';
import User from '../Components/screen/User';
import Detail from '../Components/screen/Detail';
import ForgetPass from '../Components/Authentication/ForgetPass';
import UpdatePass from '../Components/Authentication/UpdatePass';
import Person from '../Components/Cart/Person';
import EditPerson from '../Components/Cart/EditPerson';

export function registerScreens(store, Provider){

    Navigation.registerComponent('Home', () => Home, store, Provider);
    Navigation.registerComponent('HomeUser', () => HomeUser, store, Provider);
    Navigation.registerComponent('SignIn', ()=> SignIn, store, Provider);
    Navigation.registerComponent('SignUp', ()=> SignUp, store, Provider);
    Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
    Navigation.registerComponent('MyMap', ()=> MyMap, store, Provider);
    Navigation.registerComponent('User', ()=> User, store, Provider);
    Navigation.registerComponent('DetailUser', ()=> Detail, store, Provider);
    Navigation.registerComponent('ForgetPass', ()=> ForgetPass, store, Provider);
    Navigation.registerComponent('UpdatePass', ()=> UpdatePass, store, Provider);
    Navigation.registerComponent('Person', ()=> Person, store, Provider);
    Navigation.registerComponent('EditPerson', ()=> EditPerson, store, Provider);

}
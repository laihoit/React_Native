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
import PostSale from '../Components/product/PostSale';
import PostSa from '../Components/post/PostSale';
import PostRent from '../Components/post/PostRent';
import HistoryPostSale from '../Components/Cart/HistoryPostSale';
import HistoryPostRent from '../Components/Cart/HistoryPostRent';
import HistoryPost from '../Components/Cart/HistoryPost';
import CareSale from '../Components/Cart/CareSale';
import CareRent from '../Components/Cart/CareRent';
import CurrentSale from '../Components/CurrentDay/CurrentSale';
import CurrentRent from '../Components/CurrentDay/CurrentRent';

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
    Navigation.registerComponent('PostSale', () => PostSale, store, Provider);
    Navigation.registerComponent('PostSa', ()=> PostSa, store, Provider);
    Navigation.registerComponent('PostRent', ()=> PostRent, store, Provider);
    Navigation.registerComponent('HistoryPostSale', ()=> HistoryPostSale, store, Provider);
    Navigation.registerComponent('HistoryPostRent', ()=> HistoryPostRent, store, Provider);
    Navigation.registerComponent('HistoryPost',() => HistoryPost,store, Provider);
    Navigation.registerComponent('CareSale', ()=> CareSale, store, Provider);
    Navigation.registerComponent('CareRent', ()=> CareRent, store, Provider);
    Navigation.registerComponent('CurrentSale', ()=> CurrentSale, store, Provider);
    Navigation.registerComponent('CurrentRent', ()=> CurrentRent, store, Provider);
}
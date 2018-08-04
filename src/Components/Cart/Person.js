import React, { Component } from 'react';
import { View, Text,StyleSheet , Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import DB from '../database/DB';
import store from '../modules/redux/store';
import { setLoginState, resetPersisStore } from '../modules/Login/action';
import { Container } from '../component/index';
import * as Attachmentactor from '../attachment/action';

import avatar from '../../picture/avatar.png';
import edit from '../../picture/edit.png';
import sex from '../../picture/sex.png';
import phone from '../../picture/phone.png';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase/Firebaseconfig';

const { width, height } = Dimensions.get('window');

class Person extends Component {
    constructor(props){
        super(props);
        this.state= {
                nameacount :'', 
                lantitude: '',
                longtitude : '',
                imageuser : ''
        }
    }

     componentWillMount(){
         let that = this;
        var ref = firebaseApp.database().ref('User');
        var query = ref.orderByChild('Username').equalTo(this.props.mystate);
        query.once('value', function(snapshot){
            snapshot.forEach(function(child){
                 that.setState({
                    nameacount: child.val().Username,
                    lantitude : child.val().latitude,
                    longtitude : child.val().longitude
                 })

            })
        })
     }
    SignOutServer(){
        firebaseApp.auth().signOut();
        store.dispatch(setLoginState({ isLoggedIn : false, user : '' }))
        this.props.navigator.push({
            screen : 'SignIn',
            navigatorStyle: {
                navBarHidden: true
            }
        })
    }
    onSignout(){
        store.dispatch(setLoginState({ isLoggedIn : false, user : '' }))
        this.props.navigator.push({
            screen : 'SignIn',
            navigatorStyle: {
                navBarHidden: true
            }
        })
    }
    onEditPerson(){
        this.props.navigator.push({
            screen: 'EditPerson',
            title: 'EditPerson'
        })
    }
    onHistoryPostSale(){
        this.props.navigator.push({
            screen: 'HistoryPostSale',
            title: 'HistoryPostSale'
        })
    }
    onHistoryPostRent(){
        this.props.navigator.push({
            screen: 'HistoryPostRent',
            title: 'HistoryPostRent'
        })
    }

    onCareSale(){
        this.props.navigator.push({
            screen: 'CareSale',
            title: 'CareSale'
        })
    }

    onCareRent(){
        this.props.navigator.push({
            screen: 'CareRent',
            title: 'CareRent'
        })
    }

    render() {
        const {imgInfo, avatarImgInfo,avatarView, myInfo,nameInfo,userNameInfo,
          linkUserNameInfo,imgEdit,editIcon, hr, itemInfo, itemImg, itemIcon,itemText} = style;
            const { imageuser } = this.state;
        return (  
            <Container>
                <View style= {myInfo}>
                    <View style ={imgInfo}>
                          <TouchableOpacity style={imgEdit} onPress={() => this.onEditPerson()} >
                            <Image source = {edit} style={editIcon}/>
                          </TouchableOpacity>
                          <View style= {avatarView}>
                          <Image source={imageuser ? imageuser : avatar} style={avatarImgInfo}/>
                          </View> 
                    </View>

                    <View style ={nameInfo}>
                        <Text style={userNameInfo}>{this.state.nameacount}</Text>
                        <Text style={linkUserNameInfo}>{this.state.lantitude}, {this.state.longtitude}</Text>
                    </View>

                    <View style={hr}></View>

                    <View style={itemInfo}>
                        <View style={itemImg}>
                        <Image source={sex} style={itemIcon}/>
                        </View>
                        <TouchableOpacity onPress={() => this.onHistoryPostSale() }
                        style={itemText}>
                        <Text>
                        Lich su dang tin mua xe
                        </Text></TouchableOpacity>
                    </View>
                    <View style={itemInfo}>
                        <View style={itemImg}>
                        <Image source={sex} style={itemIcon}/>
                        </View>
                        <TouchableOpacity onPress={() => this.onHistoryPostRent() }
                        style={itemText}>
                        <Text>
                        Lich su dang tin thue xe
                        </Text></TouchableOpacity>
                    </View>
                    <View style={itemInfo}>
                        <View style={itemImg}>
                        <Image source={sex} style={itemIcon}/>
                        </View>
                        <TouchableOpacity onPress={() => this.onCareSale() }
                        style={itemText}>
                        <Text>
                        Xe ban quan tam
                        </Text></TouchableOpacity>
                    </View>
                    <View style={itemInfo}>
                        <View style={itemImg}>
                        <Image source={sex} style={itemIcon}/>
                        </View>
                        <TouchableOpacity onPress={() => this.onCareRent() }
                        style={itemText}>
                        <Text>
                        Xe thue quan tam
                        </Text></TouchableOpacity>
                    </View>

                    <View style={itemInfo}>
                        <View style={itemImg}>
                        <Image source={phone} style={itemIcon}/>
                        </View>
                        <TouchableOpacity style={itemText}>
                        <Text>
                        Bai dang yeu thich</Text> </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() =>this.SignOutServer()}   >
                            <Text style={itemText} >
                                Đăng xuất
                            </Text>
                        </TouchableOpacity>
                </View>
            </Container>
        )
     }
}

const style = StyleSheet.create({
    myInfo:{
        padding:8,
        paddingBottom:12,
        paddingTop:12,
        backgroundColor:'white',
        borderRadius: 5,
        borderBottomWidth:1,
        borderBottomColor: '#22222226'
    },
    imgInfo:{
        justifyContent:'center',
        borderRadius: 48,
        backgroundColor:'#6a88fd94',
        marginBottom:20,
        paddingBottom:5
    },
    avatarView:{
       flexDirection:'row',
      justifyContent:'center'
    },
    avatarImgInfo:{
        width: 60,
        height:60,
        borderRadius: 25
    },
    nameInfo:{
        paddingLeft:5
    },
    userNameInfo:{
        textAlign: 'center',
        color:'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    linkUserNameInfo:{
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 12,
        color: 'gray'
    },
    imgEdit:{
        
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    editIcon:{
        width:20,
        height:20
    },
    hr:{
      marginTop:8,
      borderBottomWidth: 0.8,
      borderBottomColor:'#2222223d'
    },
    itemInfo:{
      marginTop:15,
      flexDirection:'row'
    },
    itemImg:{
      borderRadius:50,
      marginRight: 10
    },
    itemIcon:{
      width:30,
      height:30
    },
    itemText:{
      alignSelf: 'center',
    }
});
const mapStateToProps = (state) =>({
    mystate : state.checkLogin.user
})

export default connect(mapStateToProps)(Person);
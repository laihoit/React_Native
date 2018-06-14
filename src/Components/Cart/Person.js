import React, { Component } from 'react';
import { View, Text,StyleSheet , Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import DB from '../database/DB';
import store from '../modules/redux/store';
import { setLoginState, resetPersisStore } from '../modules/Login/action';

import avatar from '../../picture/avatar.png';
import edit from '../../picture/edit.png';
import sex from '../../picture/sex.png';
import phone from '../../picture/phone.png';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class Person extends Component {
    constructor(props){
        super(props);
        this.state= {
                nameacount :'', 
                lantitude: '',
                longtitude : ''
        }
    }



    componentDidMount(){
        DB.db().transaction((tx) => {
            var sql = 'SELECT * FROM Person WHERE name=\'' + this.props.mystate + '\'';
            tx.executeSql(sql, [], (tx, results) => {
                var len = results.rows.lenght;
                if(len == 0 && this.props.username == ''){
                    Alert.alert('Bạn cần phải đăng nhập!');
                }else {
                    var row = results.rows.item(0);
                    this.setState({ nameacount : row.name , lantitude : row.locationlan, longtitude : row.locationlong })
                }
            })
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
        store.dispatch(resetPersisStore());
    }

    render() {
        const {container,imgInfo, avatarImgInfo,avatarView, myInfo,nameInfo,userNameInfo,
          linkUserNameInfo,imgEdit,editIcon, hr, itemInfo, itemImg, itemIcon,itemText} = style;
        //    if(this.props.mystate.user != ''){
        return (  
            <View style = {container}>
                <View style= {myInfo}>
                    <View style ={imgInfo}>
                          <View style={imgEdit}>
                            <Image source = {edit} style={editIcon}/>
                          </View>
                          <View style= {avatarView}>
                          <Image source= {avatar} style={avatarImgInfo}/>
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
                        <Text style={itemText}>{this.state.lantitude}</Text>
                    </View>

                    <View style={itemInfo}>
                        <View style={itemImg}>
                        <Image source={phone} style={itemIcon}/>
                        </View>
                        <Text style={itemText}>{this.state.longtitude}</Text>
                    </View>

                 <View style={itemInfo}>
                        {/* <View style={itemImg}>
                        <Image source={email} style={itemIcon}/>
                        </View>
                        <Text style={itemText}>dinhthetan.tk@gmail.com</Text> */}
                        
                    </View>
                    <TouchableOpacity onPress={() =>this.onSignout()}   >
                            <Text style={itemText} >
                                Đăng xuất
                            </Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    // }else if(this.props.mystate.user == ''){
    //     Alert.alert('Bạn cần phải đăng nhập!');
    //     this.props.navigator.push({
    //         screen : 'SignIn',
    //         navigatorStyle:{
    //             navBarHidden: true
    //         }
    //     })
    // }
     }
}

const style = StyleSheet.create({
    container:{
        padding: 10,
        width : width,
        height : height, 
    },
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
      fontSize:15,
      color:'#222'
    }
});
const mapStateToProps = (state) =>({
    mystate : state.checkLogin.user
})

export default connect(mapStateToProps)(Person);
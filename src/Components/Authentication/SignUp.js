import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, ToastAndroid } from 'react-native';

import backgr from "../../picture/sky.jpg";
import logo from "../../picture/logo.png";

import DB from '../database/DB';

const { width, height } = Dimensions.get('window');
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameup: '',
            passup: ''
        }
    }
    static navigatorStyle = {
        navBarHidden: true
    }

 
    onBack(){
        this.props.navigator.pop({
            animated: true
        });
    }

    onSaveData(){
        const { nameup, passup } = this.state;
        DB.db().transaction((tx) => {
            tx.executeSql('INSERT INTO User (User_id, name, pass) Values(null,?,?)', [nameup,passup], () => {
                this.props.navigator.push({
                    screen :'SignIn',
                    navigatorStyle:{
                        navBarHidden: true
                    }

                })
            })
        });
        
    }      

       
    render() {
        const { container, texttitle, textBack, textlogin, textapp, inputstyle, btnSignIn, logo1 } = styles;
        return (
            <View>
                <Image source={backgr} style={container} />
                <View style={texttitle} >
                    <TouchableOpacity onPress={ () => this.onBack() } >
                        <Text style={textBack}>Trở về</Text>
                    </TouchableOpacity>
                    <Text style={textlogin}>Đăng ký</Text>
                </View>
                <View style={logo1}>
                    <Image source={logo} />
                </View>
                <View >
                    <TextInput style={inputstyle}
                        placeholder="Nhập SDT"
                        onChangeText={(nameup) => { this.setState({ nameup }) }}
                        value={this.state.nameup}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#fff"
                    />
                    <TextInput style={inputstyle}
                        placeholder="Nhập mật khẩu"
                        onChangeText={(passup) => { this.setState({ passup }) }}
                        value={this.state.passup}
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#fff"
                    />
                    <TouchableOpacity style={btnSignIn}
                    onPress={() => this.onSaveData()}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff' }} >ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const widthbg = width;
const heightbg = (widthbg / 540) * 960;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: widthbg,
        height: heightbg
    },
    texttitle: {
        flexDirection: 'row',
        marginTop: 10
    },
    textBack: {
        color: '#ffffff'
    },
    textlogin: {
        width: width -80,
        color: '#fff',
        textAlign: 'center',
    },
    content: {
        justifyContent: 'space-between'
    },
    logo1: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputstyle: {
        width: width - 50,
        padding: 10,
        borderRadius: 20,
        color: '#fff',
        marginLeft: 25,
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        marginBottom: 20,
        height: 50
    },
    btnSignIn: {
        width: width - 50,
        height: height / 18,
        backgroundColor: '#0174DF',
        borderRadius: 15,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    
});
export default SignUp;
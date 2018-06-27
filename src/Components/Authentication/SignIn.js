import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DB from '../database/DB';
import { connect } from 'react-redux';
import { setLoginState } from '../modules/Login/action';
import store from '../modules/redux/store';
import { bindActionCreators } from 'redux';
import * as NotificationActions from '../notifications/action';
import { Container } from '../component/index';

import backgr from "../../picture/sky.jpg";
import logo from "../../picture/logo.png";
import user from "../../picture/user.png";
import pass from "../../picture/pass.png";


const { width, height } = Dimensions.get('window');
class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            pass: '',
            iduer: null
        }
    }
    onSignUp(){
        this.props.navigator.push({
            screen: 'SignUp',
            animated: true
        })
    }
    onForgetPass(){
        this.props.navigator.push({
            screen: 'ForgetPass',
            animated: true
        })
    }
    onSubmit(){
        const { name, pass, iduer } = this.state;
        if (name == ''){
            this.props.actions.addNotification('Name not null');
        }else if(pass == ''){
            this.props.actions.addNotification('Pass not null');
        }else{
        DB.db().transaction((tx) => {
            var sql = 'SELECT * FROM Person WHERE name=\'' + name + '\'';
            tx.executeSql(sql, [], (tx, results) => {
                var len = results.rows.length;
                if(len == 0)
                this.props.actions.addNotification('Tài khoản không tồn tại');
                 else{
                    var row = results.rows.item(0);
                    if(pass == row.pass){
                        store.dispatch(setLoginState({ isLoggedIn : true, user : name }))
                        this.props.navigator.push({
                            screen: 'Home',
                            title: 'Albums',
                            passProps: {
                                IDuser : idac
                            }
                        })

                    Alert.alert('Đăng nhập thành công' );
                    }else
                    this.props.actions.addNotification('Sai tài khoản hoặc mật khẩu');
                }
              });
          });
        }
    }
    render() {
        const { container, SectionStyle, texttitle, textBack, textlogin,
            inputstyle, btnSignIn, textfina, logo1, ImageStyle, orther } = styles;
        return (
            <Container>
                <Image source={backgr} style={container} />
                <View style={texttitle} >
                    <TouchableOpacity>
                        <Text style={textBack}>Trở về</Text>
                    </TouchableOpacity>
                    <Text style={textlogin}>Đăng nhập</Text>
                </View>
                <View style={logo1}>
                    <Image source={logo} /> 
                </View>
                <View >
                    <View style={SectionStyle} >
                        <Image source={user} style={ImageStyle} />
                        <TextInput style={inputstyle}
                            placeholder="Nhập tài khoản"
                            onChangeText={(name) => { this.setState({ name }) }}
                            value={this.state.name}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#fff"
                        />
                    </View>
                    <View style={SectionStyle} >
                        <Image source={pass} style={ImageStyle} />
                        <TextInput style={inputstyle}
                            placeholder="Nhập mật khẩu"
                            onChangeText={(pass) => { this.setState({ pass }) }}
                            value={this.state.pass}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#fff"
                        />
                    </View>
                    <TouchableOpacity style={btnSignIn}
                        onPress={() => this.onSubmit()}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff' }} >ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                    <View style={orther} >
                    <TouchableOpacity
                        onPress={() => this.onForgetPass()}
                    >
                        <Text style={textfina} >Quên mật khẩu?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onSignUp()} >
                        <Text style={textfina} >Đăng kí</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: width
    },
    texttitle: {
        flexDirection: 'row',
        marginTop: 10
    },
    textBack: {
        color: '#ffffff'
    },
    textlogin: {
        width: width - 80,
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
        flex: 1,
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
    textfina: {
        width: width / 2,
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20
    },
    ImageStyle: {
        padding: 10,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        marginLeft: 25
    },
    SectionStyle: {
        width: width - 50,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: .1,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        marginBottom: 20,
        marginLeft: 25
    },
    orther:{
        flexDirection: 'row',
        marginTop: 80,
    }
});

export default connect(null,(dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, NotificationActions), dispatch)
    };
})(SignIn); 
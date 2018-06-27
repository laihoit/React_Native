import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';

import backgr from "../../picture/sky.jpg";
import logo from "../../picture/logo.png";

import DB from '../database/DB';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Notification from '../notifications/action';
import { Container } from '../component';

const { width, height } = Dimensions.get('window');
class ForgetPass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namecheck: '',

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
    onUpdatePass(){
        this.props.navigator.push({
            screen : 'UpdatePass',
            passProps: {
                nameAcount : this.state.namecheck
            }
        })
    }
    checkacount(){
        const { namecheck } = this.state;
        if(namecheck == ''){
            this.props.actions.addNotification('Name not null');
        }else{
        DB.db().transaction((tx) =>{
            var sql = 'SELECT * FROM Person WHERE name=\'' + namecheck + '\'';
            tx.executeSql(sql,[], (tx , results) => {
                var len = results.rows.length;
                if(len == 0){
                    Alert.alert('Tài khoản không tồn tại');
                }else{
                    this.onUpdatePass();
                    Alert.alert('Tài khoản tồn tại');
                }
            })
        })
    }
    }
    render() {
        const { container, texttitle, textBack, textlogin, inputstyle, btnSignIn, logo1, btnlocation } = styles;
        return (
            <Container>
                <Image source={backgr} style={container} />
                <View style={texttitle} >
                    <TouchableOpacity onPress={ () => this.onBack() } >
                        <Text style={textBack}>Trở về</Text>
                    </TouchableOpacity>
                    <Text style={textlogin}>Xác nhận tài khoản</Text>
                </View>
                <View style={logo1}>
                    <Image source={logo} />
                </View>
                <View >
                    <TextInput style={inputstyle}
                        placeholder="Nhập tài khoản"
                        onChangeText={(namecheck) => { this.setState({ namecheck }) }}
                        value={this.state.namecheck}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#fff"
                    />
                 
                    <TouchableOpacity style={btnSignIn} onPress={ () => this.checkacount() }>
                        <Text style={{ textAlign: 'center', color: '#fff' }} >XÁC NHÂN</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width : width
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
        marginTop: 20,
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
    btnlocation:{
        width: width/5,
        height: height / 27,
        marginLeft: 25,
        backgroundColor: '#0174DF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    }
    
});
export default connect(null, (dispatch) => {
    return {
        actions : bindActionCreators(Object.assign({}, Notification), dispatch)
    }
})(ForgetPass);
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity,} from 'react-native';

import backgr from "../../picture/sky.jpg";
import logo from "../../picture/logo.png";

import DB from '../database/DB';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NotificationActions from '../notifications/action';
import { Container } from '../component';

const { width, height } = Dimensions.get('window');
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameup: '',
            passup: '',
            latitude: '',
            longitude: '',
            image: ''
        }
    }
    static navigatorStyle = {
        navBarHidden: true
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
            })

        }, (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }
 
    onBack(){
        this.props.navigator.pop({
            animated: true
        });
    }  

    onSignUp(){
        const { nameup, passup, latitude ,longitude, image} = this.state;
        if(nameup == ''){
            this.props.actions.addNotification('Name not null');
        }else if(passup == ''){
            this.props.actions.addNotification('Pass not null');
        }else{
        DB.db().transaction((tx) => {
            tx.executeSql('INSERT INTO Lai( Lai_id,image, name, pass, locationlan, locationlong) Values(null,?,?,?,?,?)', [image, nameup, passup, latitude, longitude], () => {
                this.props.navigator.push({
                    screen :'SignIn',
                    navigatorStyle:{
                        navBarHidden: true
                    }
                })
            })
        });
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
                    <Text style={textlogin}>Đăng ký</Text>
                </View>
                <View style={logo1}>
                    <Image source={logo} />
                </View>
                <View >
                    <TextInput style={inputstyle}
                        placeholder="Nhập tài khoản"
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
                    <TextInput style={inputstyle}
                        value= { this.state.latitude + "," + this.state.longitude }
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#fff"
                        editable={false}
                    />
                    
                    <TouchableOpacity style={btnSignIn} onPress={ () => this.onSignUp() }>
                        <Text style={{ textAlign: 'center', color: '#fff' }} >ĐĂNG KÝ</Text>
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

export default connect(null,(dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, NotificationActions), dispatch)
    };
})(SignUp);
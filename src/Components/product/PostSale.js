import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert  } from 'react-native';
import Speech from 'react-native-speech';
import Voice from 'react-native-voice';


const { width, height } = Dimensions.get('window');
class PostSale extends Component{
     constructor(props) {
        super(props)
        this.state = {
            passcheck: '',
            results:[]
        }
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
    }
    onSpeechResults(e){
        this.setState({
            results : e.value
        })
    }

    speech(){
        Speech.speak({
            text: 'Hi, How are you?',
            voice:'en_US'
        })
    }
    onSpeechStart(){
        Voice.start('en-US');
    }
    onSpeechEnd(){
        Voice.stop();
    }

    render() {
        const {index, container, texttitle, textBack, textlogin, inputstyle, btnSignIn, logo1 } = styles;
        return(
            <View>
                <View style={index} >
                <View style={texttitle} >
                    <TouchableOpacity onPress={ () => this.onBack() } >
                        <Text style={textBack}>Trở về</Text>
                    </TouchableOpacity>
                    <Text style={textlogin}>Xác nhận tài khoản</Text>
                </View>
                
                <View  >
                        {this.state.results.map((text, index) =>{
                            return(
                                <Text key={index}>{text}</Text>
                            )
                        })}
                    <TouchableOpacity style={btnSignIn} onPress={ this.speech.bind(this) }>
                        <Text style={{ textAlign: 'center', color: '#fff' }} >XÁC NHÂN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignIn} onPress={ this.onSpeechStart.bind(this) }>
                        <Text style={{ textAlign: 'center', color: '#fff' }} >START</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignIn} onPress={ this.onSpeechEnd.bind(this) }>
                        <Text style={{ textAlign: 'center', color: '#fff' }} >THE END</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    index: {
        height: height
    },
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

});
export default PostSale;
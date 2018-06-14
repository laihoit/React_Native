import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking } from 'react-native';
import Header from './Header';

const { widthDimension, heightDimension } = Dimensions.get('window');
class HomeUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../picture/back.png'),
                id: 'back',
                fontSize: 10,
            }
        ]
    };
    onNavigatorEvent(e) {
        if (e.id == 'back') {
            this.props.navigator.dismissModal();
        }
    }
        
    _keyExtractor = (item, index) => item.login.password;

    componentDidMount(){
        fetch('https://randomuser.me/api?results=20')
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ data : responseJson.results })
        })
        .catch(err => console.log(err));
    }
    onPressItemUser(item){
        this.props.navigator.push({
            screen: 'DetailUser',
            animated: true,
            passProps:{
                myacount : item.login.username,
                myimage: item.picture.large,
                myemail: item.email,
                mylocal: item.location.street,
                mydate: item.registered,
                myphone: item.phone ,
                myname: item.name.last,
                mystate: item.location.state,
                 mysex : item.gender
            }
        })
    }
    render() {
        const { container, item_header, imageStyle, titleStyle,
             item_style, image_main, view_Main, view_Touch, text_touch } = styles;
        return (
            <View style={container} >
                <FlatList
                data = { this.state.data}
                renderItem= {({item}) => (
                    <View style={item_style} >
                        <View style={item_header} >  
                            <View>
                            <Image
                                style={imageStyle} 
                                source={{ uri: item.picture.medium}}
                            />
                            </View>
                            <View style={titleStyle} >
                                <Text>{item.login.username}</Text>
                                <Text>{item.email}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={view_Main} >
                                <Image
                                style={image_main}
                                    source={{ uri : item.picture.thumbnail}}
                                />
                            </View>
                            <View style={view_Touch} >
                                <TouchableOpacity  onPress={this.onPressItemUser.bind(this,item)} >
                                    <Text style={text_touch} >Detail!!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) }
                keyExtractor= {this._keyExtractor}
                
                />
            </View>
        );
    }
}

export default HomeUser;

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#455a64'
    },
    item_style:{
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    item_header:{
        flexDirection : 'row',
        marginTop: 20
    },
    imageStyle:{
        width: 50,
        height: 50,
        marginLeft: 20
    },
    titleStyle:{
        justifyContent: 'space-around',
        marginLeft: 20
    },
    image_main:{
        width:300,
        height: 300,
    },
    view_Main:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop:10,
        marginBottom : 10
    },
    view_Touch:{
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    },
    text_touch: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
});

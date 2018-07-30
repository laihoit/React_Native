import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking, Alert } from 'react-native';
import { firebaseApp } from '../firebase/Firebaseconfig';

let rootNavigator = null;

export function getRootNavigator(){
    return rootNavigator;
}
class Home extends Component {
    constructor(props){
        super(props);
        items=[]
        this.state = {
            albums: [],

        }; 
        rootNavigator = this.props.navigator;
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {
        
        leftButtons: [
          {
            icon: require('../../picture/menul.png'),
            id: 'drawer',
            fontSize:10
          }
        ],
        rightButtons: [
            {
                icon: require('../../picture/cart1.png'),
                id : 'person',
                fontSize: 10,
            }
        ],
      };
      onNavigatorEvent(e){
            if(e.id == 'drawer'){
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true
                  });
            }else if(e.id == 'person'){
                this.props.navigator.push({
                    screen: 'Person',
                });
            }

        }

    _keyExtractor = (item, index) => index.toString();

   
    componentDidMount(){
        // fetch('https://rallycoding.herokuapp.com/api/music_albums')
        // .then(response => response.json())
        // .then(responseJson => {
        //     this.setState({ albums : responseJson })
        // })
        // .catch(err => console.log(err));
        firebaseApp.database().ref('PostSale').on('value', (snap) => {
            snap.forEach((data) => {
                items.push({
                    key: data.key,
                    data: data.val()
                })
            })
            this.setState({
                albums : items
            })
        })
    }
    render() {
        const { container, item_header, imageStyle, titleStyle,
             item_style, image_main, view_Main, view_Touch, text_touch } = styles;
        return (
            <View style={container} >
          
                <FlatList
                data = { this.state.albums}
                renderItem= {({item}) => (
                    <View style={item_style} >
                        <View style={item_header} >  
                            <View>
                            <Image
                                style={imageStyle} 
                                source={{ uri: item.data.Image }}
                            />
                            </View>
                            <View style={titleStyle} >
                                <Text>{item.data.NameCar}</Text>
                                <Text>{item.data.Money}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={view_Main} >
                                <Image
                                style={image_main}
                                    source={{ uri : item.data.Image}}
                                />
                            </View>
                            <View style={view_Touch} >
                                <TouchableOpacity onPress = {() => Linking.openURL(item.data.Image)} >
                                    <Text style={text_touch} >Buy now!</Text>
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

export default Home;

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

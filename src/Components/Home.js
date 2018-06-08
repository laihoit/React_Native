import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking } from 'react-native';
import Header from './Header';

const { widthDimension, heightDimension } = Dimensions.get('window');
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            albums: [],
        }; 
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {
        leftButtons: [
          {
            icon: require('../picture/menul.png'),
            id: 'drawer',
            fontSize:10
          }
        ],
        
      };
      onNavigatorEvent(event){
          switch(event.id){
              case 'drawer':
              this.props.navigator.toggleDrawer({
                side: 'left',
                animated: true
              });
          }
        }

    _keyExtractor = (item, index) => index.toString();

   
    componentDidMount(){
        fetch('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ albums : responseJson })
        })
        .catch(err => console.log(err));
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
                                source={{ uri: item.thumbnail_image }}
                            />
                            </View>
                            <View style={titleStyle} >
                                <Text>{item.title}</Text>
                                <Text>{item.artist}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={view_Main} >
                                <Image
                                style={image_main}
                                    source={{ uri : item.image}}
                                />
                            </View>
                            <View style={view_Touch} >
                                <TouchableOpacity onPress = {() => Linking.openURL(item.url)} >
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

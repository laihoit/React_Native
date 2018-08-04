import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking ,Alert} from 'react-native';
import { firebaseApp } from '../firebase/Firebaseconfig';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width, height } = Dimensions.get('window');

class HomeUser extends Component {

    constructor(props){
        super(props);
        items=[]
        this.state = {
            data: [],
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../picture/back.png'),
                id: 'back',
                fontSize: 10,
            }
        ]
    };
    onNavigatorEvent(e) {
        if (e.id == 'back') {
            this.props.navigator.pop();
        }
    }
        
    _keyExtractor = (item,index) => index.toString();

    componentDidMount(){

        // fetch('https://randomuser.me/api?results=20')
        // .then(response => response.json())
        // .then(responseJson => {
        //     this.setState({ data : responseJson.results })
        // })
        // .catch(err => console.log(err));
        firebaseApp.database().ref('PostRent').on('value', (snap) => {
            snap.forEach((data) => {
                items.push({
                    key: data.key,
                    data: data.val()
                })
            })
            this.setState({
                data : items
            })
        })
    }
    onDetail(item){
        this.props.navigator.push({
            screen: 'DetailUser',
            title: 'Detail',
            animated: true,
            passProps:{
                myacount : item.data.NameCar,
                myimage: item.data.Image,
                myemail: item.data.Hangxe,
                mylocal: item.data.Money,
                mydate: item.data.NumberKm,
                myphone: item.data.Tinhtrang ,
                myname: item.data.Mauxe,
                mystate: item.data.NamSx,
                mysex : item.data.Biensoxe
            }
        })
    }

    onLocate(item){
        this.props.navigator.push({
            screen : 'MyMap',
            title: 'Mapuser',
            passProps: {
                name : item.data.User,
                locationlan : item.data.Latitude,
                locationlong : item.data.Longitude
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
                                source={{ uri: item.data.Image}}
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
                                    source={{ uri : item.data.Image }}
                                />
                            </View>
                            <View style={view_Touch} >
                            <TouchableOpacity onPress = {this.onDetail.bind(this, item)} >
                                    <Text style={text_touch} >Chi tiet</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {this.onLocate.bind(this, item)} >
                                    <Text style={text_touch} >Dinh vi</Text>
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
        height: 200,
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
        flexDirection : 'row'
    },
    text_touch: {
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        width : width /2,
        textAlign : 'center'
    }
});

const mapStateToProps = (state) =>({
    mystate : state.checkLogin.user
})

export default connect(mapStateToProps)(HomeUser);
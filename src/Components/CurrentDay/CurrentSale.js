import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking, Alert, TextInput } from 'react-native';
import { firebaseApp } from '../firebase/Firebaseconfig';
import sex from '../../picture/sex.png';
import { connect } from 'react-redux';

let rootNavigator = null;

export function getRootNavigator(){
    return rootNavigator;
}
const { width, height } = Dimensions.get('window');

class CurrentSale extends Component {
    constructor(props){
        super(props);
        items=[]
        this.state = {
            posted: [],
            searchText : '',
            items: []
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
        that = this;
        var month= new Date().getMonth()+1;
        var date = new Date().getDate() +"/"+ month +"/" + new Date().getFullYear();
        var query = firebaseApp.database().ref('PostSale').orderByChild('Date').equalTo(date);
        query.once('value', function(snapshot){
            snapshot.forEach(function(child){
                items.push({
                    key: child.key,
                    data: child.val()
                })
            })
            that.setState({
                posted : items
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
             item_style, image_main, view_Main, view_Touch, text_touch, SectionStyle, ImageStyle, inputstyle } = styles;
        return (
            <View style={container} >
                <View style={SectionStyle} >
                        <TextInput style={inputstyle}
                            placeholder="Tìm kiếm sản phẩm"
                            onChangeText={(searchText) => { this.setState({ searchText }) }}
                            value={this.state.searchText}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#fff"
                        />
                        <TouchableOpacity onPress={() => this.searchTexta()}  >
                        <Image source={sex} style={ImageStyle} />
                        </TouchableOpacity>
                    </View>
                    
                <FlatList
                data = { this.state.posted}
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
        marginTop: 10
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
        paddingBottom: 10,
        width : width /2,
        textAlign : 'center'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: .1,
        alignItems: 'center',
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
    },
    ImageStyle: {
        padding: 10,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        marginRight: 25
    },
    inputstyle: {
        flex: 1,
        height: 50,
        marginLeft : 20
    },
});
const mapStateToProps = (state) =>({
    mystate : state.checkLogin.user
})

export default connect(mapStateToProps)(CurrentSale);

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking, Alert, TextInput } from 'react-native';
import { firebaseApp } from '../firebase/Firebaseconfig';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import redlike from '../../picture/redlike.png';
import like from '../../picture/like.png';
import sex from '../../picture/sex.png';
import base from 're-base';

let rootNavigator = null;

export function getRootNavigator() {
    return rootNavigator;
}
const { width, height } = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
        items = []
        this.state = {
            albums: [],
            searchText: '',
            Data: null,
            itemlike: false
        };
        rootNavigator = this.props.navigator;
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {

        leftButtons: [
            {
                icon: require('../../picture/menul.png'),
                id: 'drawer',
                fontSize: 10
            }
        ],
        rightButtons: [
            {
                icon: require('../../picture/cart1.png'),
                id: 'person',
                fontSize: 10,
            }
        ],
    };
    onNavigatorEvent(e) {
        if (e.id == 'drawer') {
            this.props.navigator.toggleDrawer({
                side: 'left',
                animated: true
            });
        } else if (e.id == 'person') {
            this.props.navigator.push({
                screen: 'Person',
            });
        }

    }

    _keyExtractor = (item, index) => index.toString();


    componentDidMount() {
        firebaseApp.database().ref('PostSale').on('value', (snap) => {
            snap.forEach((data) => {
                items.push({
                    key: data.key,
                    data: data.val()
                })
            })
            this.setState({
                albums: items
            })
        })
    }
    onDetail(item) {
        this.props.navigator.push({
            screen: 'DetailUser',
            title: 'Detail',
            animated: true,
            passProps: {
                myacount: item.data.NameCar,
                myimage: item.data.Image,
                myemail: item.data.Hangxe,
                mylocal: item.data.Money,
                mydate: item.data.NumberKm,
                myphone: item.data.Tinhtrang,
                myname: item.data.Mauxe,
                mystate: item.data.NamSx,
                mysex: item.data.Biensoxe
            }
        })
    }

    onLocate(item) {
        this.props.navigator.push({
            screen: 'MyMap',
            title: 'Mapuser',
            passProps: {
                name: item.data.User,
                locationlan: item.data.Latitude,
                locationlong: item.data.Longitude
            }
        })

    }
    RedLike(item) {
        firebaseApp.database().ref('/PostSale/' + item.key).update({ Care: true })
        firebaseApp.database().ref('/PostSale/' + item.key).update({ UserCare: this.props.mystate })
    }

    searchTexta(searchText) {
        let search = new RegExp(searchText, 'gi');
        var data = [];
        if (search) {
            for (let i in this.state.albums) {
                if (this.state.albums[i].data.NameCar.match(search)) {
                    data.push(this.state.albums[i]);
                    break;
                }

            }
            this.setState({
                Data: data
            })
        }
    }

    render() {
        const { container, item_header, imageStyle, titleStyle,
            item_style, image_main, view_Main, view_Touch, text_touch, SectionStyle, ImageStyle, inputstyle, imageStylelike } = styles;
        const { itemlike, Data, albums } = this.state;
        return (
            <View style={container} >
                <View style={SectionStyle} >
                    <TextInput style={inputstyle}
                        placeholder="Tìm kiếm sản phẩm"
                        onChangeText={(searchText) => { this.searchTexta(searchText) }}
                        value={this.state.searchText}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#fff"
                    />
                </View>

                <FlatList
                    data={Data ? Data : albums}
                    renderItem={({ item }) => (
                        <View style={item_style} >
                            <View style={item_header} >
                                <View>
                                    <Image
                                        style={imageStyle}
                                        source={{ uri: item.data.Image }}
                                    />
                                </View>
                                <TouchableOpacity onPress={this.RedLike.bind(this, item)}>
                                    {item.data.Care ?
                                        <Image
                                            style={imageStylelike}
                                            source={redlike} /> :
                                        <Image
                                            style={imageStylelike}
                                            source={like}
                                        />}

                                </TouchableOpacity>
                                <View style={titleStyle} >
                                    <Text>{item.data.NameCar}</Text>
                                    <Text>{item.data.Money}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={view_Main} >
                                    <Image
                                        style={image_main}
                                        source={{ uri: item.data.Image }}
                                    />
                                </View>
                                <View style={view_Touch} >
                                    <TouchableOpacity onPress={this.onDetail.bind(this, item)} >
                                        <Text style={text_touch} >Chi tiet</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onLocate.bind(this, item)} >
                                        <Text style={text_touch} >Dinh vi</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={this._keyExtractor}

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
    item_style: {
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
    item_header: {
        flexDirection: 'row',
        marginTop: 10,
    },
    imageStyle: {
        width: 50,
        height: 50,
        marginLeft: 20
    },
    imageStylelike: {
        width: 25,
        height: 25,
        position: 'absolute',
        right: -width / 1.5,
    },
    titleStyle: {
        justifyContent: 'space-around',
        marginLeft: 20
    },
    image_main: {
        width: 300,
        height: 200,
    },
    view_Main: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    view_Touch: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    text_touch: {
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 10,
        width: width / 2,
        textAlign: 'center'
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
        marginLeft: 20
    },
});

const mapStateToProps = (state) => ({
    mystate: state.checkLogin.user
})

export default connect(mapStateToProps)(Home);
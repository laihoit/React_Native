import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking, Alert } from 'react-native';
import DB from './database/DB';
import { addPropertyToCollection } from './action';

class User extends Component {
    constructor(props) {
        super(props);
        arrayUser = [];
        maparray =[];
       
        this.state = {
            user: [],
            usermap : [],
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

    _keyExtractor = (item, index) => index.toString();


    componentDidMount() {
        DB.db().transaction(((tx) => {
            var sql = 'SELECT * FROM Person';
            tx.executeSql(sql, [], (tx, results) => {
                var len = results.rows.length
                for (let i = 0; i < len; i++) {
                    arrayUser.push(results.rows.item(i));
                }
                this.setState({ user: arrayUser });
               
           
            })
        }))

    }
    _onPress(item){
        this.props.navigator.push({
            screen : 'MyMap',
            passProps: {
                name : item.name,
                locationlan : item.locationlan,
                locationlong : item.locationlong
            }
        })

    }
    render() {
        const { container, item_header, titleStyle,
            item_style, view_Touch, text_touch } = styles;
        return (
            <View style={container} >

                <FlatList
                    data={this.state.user}
                    renderItem={({ item }) => (
                        <View style={item_style} >
                            <View style={item_header} >
                                <View style={titleStyle} >
                                   <TouchableOpacity >
                                   <Text>{item.name}</Text>
                                    <Text>{item.pass}</Text>
                                    <Text>{item.locationlan}</Text>
                                    <Text>{item.locationlong}</Text>
                                   </TouchableOpacity>
                                </View>
                            </View>
                            <View>

                                <View style={view_Touch} >
                                    <TouchableOpacity onPress= {this._onPress.bind(this, item)}>
                                        <Text style={text_touch} >Định vị!</Text>
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

export default User;

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
        marginTop: 20
    },
    imageStyle: {
        width: 50,
        height: 50,
        marginLeft: 20
    },
    titleStyle: {
        justifyContent: 'space-around',
        marginLeft: 20
    },
    image_main: {
        width: 300,
        height: 300,
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

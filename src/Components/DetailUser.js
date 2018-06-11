import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking, Alert } from 'react-native';

class User extends Component {
    constructor(props) {
        super(props);
       
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
            this.props.navigator.pop();
        }
    }

    render() {
        const { container} = styles;
        return (
            <View style={container} >
                <Text>{this.props.name}</Text>
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
   
});

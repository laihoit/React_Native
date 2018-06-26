import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
StatusBar.setHidden(true)
import Notification from '../notifications/index';

class Container extends Component{
    render(){
        return (
            <SafeAreaView style={ styles.container } >
                <View style={ styles.container } >
                    {this.props.children}
                    <Notification/>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
export default Container;
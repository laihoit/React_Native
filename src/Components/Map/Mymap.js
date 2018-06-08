import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class MyMap extends Component{
    constructor(props){
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {
        leftButtons: [
            {
            icon: require('../../picture/back.png'),
            id: 'back',
            fontSize:10,
            }
        ]
    };
    onNavigatorEvent(e){
        if(e.id == 'back'){
            this.props.navigator.dismissModal();
        }
      }

    render(){
        return(
            <MapView
            style={styles.container}
            initialRegion={{
                latitude: 10.856094,
                longitude: 106.631084,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
            />
        )
    }
}
const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
    }
})
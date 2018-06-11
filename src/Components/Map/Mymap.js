import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import person from '../../picture/person.png';

export default class MyMap extends Component {
    constructor(props) {
        super(props);
        arraysMarker=[
            {
                latitude: 10.852332,
                longitude: 106.6348151
            }
        ];
        this.state = {
            region: {
                latitude: 10.852332,
                longitude: 106.6348151,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            marker: {
                latitude: null,
                longitude: null
            },
            markers: arraysMarker
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
            this.props.navigator.dismissModal();
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                marker: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
            })
        }, (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }
    onShowMarker(data){
        const { markers } = this.state;
        let latitude = data.nativeEvent.coordinate.latitude;
        let longitude = data.nativeEvent.coordinate.longitude;
        arraysMarker.push({
            latitude : latitude,
            longitude : longitude
        });
        this.setState({markers : arraysMarker});
        console.log(markers);
    }
    renderMarker(){
        const { markers } = this.state;
        let renderMarkers =[];
        for(marker of markers){
            if(marker.longitude && marker.latitude) {
                renderMarkers.push(
                    <Marker
                    key = { marker.latitude }
                    coordinate = { marker}
                    ></Marker>
                )
            }
        }

        return renderMarkers;
    }
    render() {
            if(this.props.locationlan == null || this.props.locationlong == null){
                return(
                <MapView
                    initialRegion={this.state.region}
                    style={styles.map}
                    onPress={this.onShowMarker.bind(this)}
                >
                {(this.state.marker.latitude && this.state.marker.longitude) &&
                    <Marker
                    coordinate={this.state.marker}
                    />
                }
                {this.renderMarker()}
                </MapView>
                )}else {
                return(
                <MapView
                    initialRegion={this.state.region}
                    style={styles.map}
                    onPress={this.onShowMarker.bind(this)}
                >
                 <Marker
                coordinate = {{
                    latitude: parseInt(this.props.locationlan),
                    longitude: parseInt(this.props.locationlong)
                }}
                />
                {(this.state.marker.latitude && this.state.marker.longitude) &&
                    <Marker
                    coordinate={this.state.marker}
                    />
                }
                {this.renderMarker()}
                </MapView>
                )}
    }
}
const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})
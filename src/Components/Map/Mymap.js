import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
export default class MyMap extends Component {
    constructor(props) {
        super(props);
        arraysMarker = [
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
            markers: arraysMarker,
            addressbegin: '',
            addressend: '',
            directionsMap: [],
            addresslocation: '',
            location: [],
            findlat :'',
            findlong : ''
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
    onShowMarker(data) {
        const { markers } = this.state;
        let latitude = data.nativeEvent.coordinate.latitude;
        let longitude = data.nativeEvent.coordinate.longitude;
        arraysMarker.push({
            latitude: latitude,
            longitude: longitude
        });
        this.setState({ markers: arraysMarker });
    }
    renderMarker() {
        const { markers } = this.state;
        let renderMarkers = [];
        for (marker of markers) {
            if (marker.longitude && marker.latitude) {
                renderMarkers.push(
                    <Marker
                        key={marker.latitude}
                        coordinate={marker}
                    ></Marker>
                )
            }
        }

        return renderMarkers;
    }
    findDirectionbetweentowpoint() {
        const { addressbegin, addressend } = this.state
        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + addressbegin + '&destination=' + addressend + '&region=vn&key=AIzaSyDnwLF2-WfK8cVZt9OoDYJ9Y8kspXhEHfI')
            .then(response => response.json)
            .then(responseJson => {
                this.setState({ directionsMap: responseJson })
                console.log("sau khi tim kiem " + this.state.directionsMap)
            })
            .catch(err => console.log(err));
    }
    findlocation() {
        const { addresslocation, location, findlat, findlong } = this.state;
        fetch('https://maps.google.com/maps/api/geocode/json?address=' + addresslocation + '\'')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datasource: responseJson.results,
                })
                this.setState({
                    findlat : this.state.datasource[0].geometry.location.lat,
                    findlong : this.state.datasource[0].geometry.location.lng
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    renderfindlocation(){
        return(
        <Marker
                title='day la '
                coordinate={{
                    latitude: this.state.findlat,
                    longitude: this.state.findlong
                }}
            />
            )
    }
    render() {
        if (this.props.locationlan == null || this.props.locationlong == null) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.btnSignIn} >
                        <View>
                            <TextInput style={styles.inputstyle}
                                placeholder="Nhập vi tri bat dau"
                                onChangeText={(addresslocation) => { this.setState({ addresslocation }) }}
                                value={this.state.addresslocation}
                                placeholderTextColor="#fff"
                            />
                            <TextInput style={styles.inputstyle}
                                placeholder="Nhập vi tri ket thuc"
                                onChangeText={(addressend) => { this.setState({ addressend }) }}
                                value={this.state.addressend}
                                placeholderTextColor="#fff"
                            />

                        </View>
                        <TouchableOpacity style={styles.textbtn} onPress={() => this.findlocation()}>
                            <Text >Tim</Text>
                        </TouchableOpacity>
                    </View>
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
                         {
                           this.state.findlat != '' ? this.renderfindlocation() : ''
                         } 
                    </MapView>
                </View>


            )
        } else {
            return (
                <MapView
                    initialRegion={this.state.region}
                    style={styles.map}
                    onPress={this.onShowMarker.bind(this)}
                >
                    <Marker
                        coordinate={{
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
            )
        }
    }
}
const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    inputstyle: {
        width: width - 100,
        marginLeft: 5,
        height: height / 20,
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        marginTop: 10,

    },
    btnSignIn: {
        position: 'absolute',
        zIndex: 999
    },
    textbtn: {
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        width: width / 5,
        marginTop: 5,
        marginLeft: 5,
        padding: 5
    }

})
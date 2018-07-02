import React, { Component } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NotificationAction from './action';

class NotificationContainer extends Component {

    state = {
        opacity: new Animated.Value(0)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message) {
            this.displayNotification();
        }
    }
    displayNotification() {
        Animated.timing(
            this.state.opacity,
            {
                toValue: 0,
                duration: 1000
            }
        ).start();
    }

    render() {
        if (this.props.message) {
            return (
                <TouchableOpacity style={styles.container} onPress={() => this.props.actions.removeNotification()}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.text}>{this.props.message}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        } else {
            return (
                <View />
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 50,
        backgroundColor: 'red',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        zIndex: 99999
    }
});
const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}
const mapDispatchToProp = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, NotificationAction), dispatch)
    }
}
export default connect(
    mapStateToProps, mapDispatchToProp
)(NotificationContainer);
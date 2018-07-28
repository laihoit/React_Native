import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
import Notification from '../notifications/index';
import { changeOrientation } from '../appstate/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

StatusBar.setHidden(true)
const { height } = Dimensions.get('window');

class Container extends Component{

    onLayout(e){
        const { width, height } = e.nativeEvent.layout;
        if(width === 0 || height === 0){ return }
        if(width > height && this.props.orientation != 'landscape'){
            this.props.actions.changeOrientation('landscape', { width: width, height: height });
        }else if(height > width && this.props.orientation != 'portrait'){
            this.props.actions.changeOrientation('portrait', { width : width, height : height });
        }
        if(this.props.onLayout)
        this.props.onLayout(e);
    }

    render(){
        return (
            <SafeAreaView style={ styles.container } onLayout={this.onLayout.bind(this)} >
                <ScrollView style={ styles.container } >
                    {this.props.children}
                    <Notification/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height : height
    }
});
const mapStateToProps = (state) => {
    return {
        orientation : state.appState.orientation
    }
}
export default connect(mapStateToProps, (dispatch) => {
    return{
        actions : bindActionCreators(Object.assign({changeOrientation : changeOrientation}), dispatch)
    }
})(Container);
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

const { widhtDimension, heightDimension } = Dimensions.get('window');
const Header = (props) => {
    const { viewStyle, textStyle } = styles;

    return (
        <View style={viewStyle} >
            <Text style={textStyle} >{props.headerText}</Text>
        </View>
    )
}
const styles = {
    viewStyle:{
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: heightDimension/ 8,
        paddingTop : 15,
        shadowColor: '#000',
        shadowOffset: { widhtDimension: 0 , heightDimension : 20 },
        shadowOpacity: 0.2
    },
    textStyle:{
        fontSize: 20,

    }
}

export default Header;
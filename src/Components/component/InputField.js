import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text } from 'react-native';
import propTypes from 'prop-types';
import IconButton from './IconButton';

export default class InputField extends Component {

    onFocus() {
        this.textInput.focus();
    }
    render() {
        const { iconName, iconSize, iconColor, keyboardType, placeholder, onFocus, onBlur, onSubmitEditing, secureTextEntry,
            onChangeText, value, returnKeyType, autoCorrect, autoFocus, autoCapitalize, renderIcon, inputStyle, viewStyle, editable, placeholderTextColor } = this.props;
        return (
            <View style={[styles.container, viewStyle]}>
                {
                    renderIcon &&
                    <IconButton
                        name={iconName}
                        size={iconSize}
                        color={iconColor}
                    />
                }
                <TextInput
                    ref={input => { this.textInput = input }}
                    keyboardType={keyboardType}
                    style={[styles.input, { width: renderIcon ? width - 50 : width }, inputStyle]}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={onChangeText}
                    value={value}
                    returnKeyType={returnKeyType}
                    underlineColorAndroid="transparent"
                    autoCorrect={autoCorrect}
                    autoFocus={autoFocus}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    placeholderTextColor={placeholderTextColor}
                />
            </View>
        )
    }
}

InputField.defaultProps = {
    textInput: '',
    keyboardType: 'default',
    autoFocus: false,
    autoCorrect: false,
    autoCapitalize: 'none',
    placeholder: '',
    value: '',
    returnKeyType: 'done',
    iconName: null,
    iconSize: null,
    iconColor: null,
    renderIcon: false,
    secureTextEntry: false,
    inputStyle: {},
    viewStyle: {},
    editable: true,
    placeholderTextColor:"#000"
}

InputField.propTypes = {
    autoCorrect: propTypes.bool,
    autoFocus: propTypes.bool,
    autoCapitalize: propTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    placeholder: propTypes.string,
    value: propTypes.string,
    onChangeText: propTypes.func,
    onSubmitEditing: propTypes.func,
    onFocus: propTypes.func,
    onBlur: propTypes.func,
    value: propTypes.string,
    keyboardType: propTypes.oneOf(['default', 'numeric', 'email-address', 'phone-pad']),
    textInput: propTypes.string,
    iconName: propTypes.string,
    iconSize: propTypes.number,
    iconColor: propTypes.string,
    renderIcon: propTypes.bool,
    secureTextEntry: propTypes.bool,
    returnKeyType: propTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
    editable: propTypes.bool,
    placeholderTextColor : propTypes.string
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        //width: width,
        height: 40,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center'
    },
    input: {
        height: 40
    }
})
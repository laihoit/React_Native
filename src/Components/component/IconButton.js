import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import propTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

export default class IconButton extends Component {
    render() {
        const { name, size, color, onPress, style } = this.props;
        if (this.props.onPress) {
            return (
                <TouchableOpacity onPress={onPress} style={style}>
                    <Icon
                        name={name}
                        size={size}
                        color={color}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <Icon
                    name={name}
                    size={size}
                    color={color}
                    style={style}
                />
            )
        }

    }
}

Icon.defaultProps = {
    iconName: null,
    iconSize: null,
    iconColor: null
}

Icon.propTypes = {
    iconName: propTypes.string,
    iconSize: propTypes.number,
    iconColor: propTypes.string,
    onPress: propTypes.func
}

import React, { Component } from 'react';
import {StyleSheet, View, Button, Image} from 'react-native';

class Drawer extends Component {

    onShowHome = () => {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      };
    
      onShowHomeUser = () => {
        this.props.navigator.showModal({
            screen: 'HomeUser',
            title: 'HomeUser',
          });
      };
      onShowMymap = () => {
        this.props.navigator.showModal({
            screen: 'MyMap',
            title: 'MyMap',
          });
      };
      onShowUser = () => {
        this.props.navigator.showModal({
            screen: 'User',
            title: 'User',
          });
      };

  render() {
      const { container, button, Viewhr, imageStyle } = styles;
    return (
      <View style={container}>
      <View>
          <Image
          source={require('../../picture/logo.png')}
          />
          <View style={Viewhr} />
      </View>
        <View style={button}>
        <Image 
          source={ require('../../picture/house.png')}
        />
          <Button
            onPress={this.onShowHome}
            title="Home"/>
        </View>
        <View style={button}>
        <Image 
          source={ require('../../picture/house.png')}
        />
          <Button
            onPress={this.onShowHomeUser}
            title="HomeUser"/>
        </View>
        <View style={button}>
        <Image 
          source={ require('../../picture/map.png')}
        />
          <Button
            onPress={this.onShowMymap}
            title="Mymap"/>
        </View>
        <View style={button}>
        <Image 
        style={imageStyle}
          source={ require('../../picture/person.png')}
        />
          <Button
            onPress={this.onShowUser}
            title="User"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
  button: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 10
  },
  Viewhr: {
      borderWidth: 0.5,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20
  },
  imageStyle: {
    width: 30,
    height: 30
  }
});

export default Drawer;
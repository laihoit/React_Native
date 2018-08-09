import React, { Component } from 'react';
import {StyleSheet, View, Button, Image, ScrollView} from 'react-native';
import { getRootNavigator } from '../screen/Home';

class Drawer extends Component {

    onShowHome = () => {
        this.props.navigator.toggleDrawer({
          side: 'left', to: 'closed'
        });
        getRootNavigator().push({
          screen: 'Home',
          title: 'Home',
        });
      };
    
      onShowHomeUser = () => {
        this.props.navigator.toggleDrawer({ side: 'left', to: 'closed' });
        getRootNavigator().push({
            screen: 'HomeUser',
            title: 'HomeUser',
          });
      };
      onShowMymap = () => {
        this.props.navigator.toggleDrawer({ side: 'left', to: 'closed' });
        getRootNavigator().push({
            screen: 'MyMap',
            title: 'MyMap',
          });
      };
      onPostsale = () => {
        this.props.navigator.toggleDrawer({ side: 'left', to: 'closed' });
        getRootNavigator().push({
            screen: 'PostSa',
            title: 'Ban xe',
          });
      };
      onPostRent = () => {
        this.props.navigator.toggleDrawer({ side: 'left', to: 'closed' });
        getRootNavigator().push({
            screen: 'PostRent',
            title: 'Thue xe',
          });
      };
      onCurrentSale = () => {
        this.props.navigator.toggleDrawer({ side: 'left', to: 'closed' });
        getRootNavigator().push({
            screen: 'CurrentSale',
            title: 'Ban xe hom nay',
          });
      };
      onCurrentRent = () => {
        this.props.navigator.toggleDrawer({ side: 'left', to: 'closed' });
        getRootNavigator().push({
            screen: 'CurrentRent',
            title: 'Thue xe hom nay',
          });
      };

  render() {
      const { container, button, Viewhr, imageStyle } = styles;
    return (
      <ScrollView style={container}>
      <View>
          <Image
          source={require('../../picture/logo.png')}
          />
          <View style={Viewhr} />
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
        style={imageStyle}
          source={ require('../../picture/person.png')}
        />
          <Button
            onPress={this.onPostsale}
            title="Dang tin ban xe"/>
        </View>
        <View style={button}>
        <Image 
        style={imageStyle}
          source={ require('../../picture/person.png')}
        />
          <Button
            onPress={this.onPostRent}
            title="Dang tin thue xe"/>
        </View>
        <View style={button}>
        <Image 
        style={imageStyle}
          source={ require('../../picture/person.png')}
        />
          <Button
            onPress={this.onCurrentSale}
            title="Bán xe ngày hôm nay"/>
        </View>
        <View style={button}>
        <Image 
        style={imageStyle}
          source={ require('../../picture/person.png')}
        />
          <Button
            onPress={this.onCurrentRent}
            title="Thuê xe ngày hôm nay"/>
        </View>
      </ScrollView>
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
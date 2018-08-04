// import React, { Component } from 'react';
// import { View, Text,StyleSheet , Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
// import store from '../modules/redux/store';
// import { Navigation } from 'react-native-navigation';

// import { connect } from 'react-redux';
// import { firebaseApp } from '../firebase/Firebaseconfig';

// const { width, height } = Dimensions.get('window');

// Navigation.startTabBasedApp({
//     tabs: [
//       {
//         label: 'Xe mua',
//         screen: 'HistoryPostSale', // this is a registered name for a screen
//    //     icon: require('../img/one.png'),
//     //    selectedIcon: require('../img/one_selected.png'), // iOS only
//         title: 'Xe mua'
//       },
//       {
//         label: 'Thue xe',
//         screen: 'HistoryPostRent',
//    //     icon: require('../img/two.png'),
//     //    selectedIcon: require('../img/two_selected.png'), // iOS only
//         title: 'Thue xe'
//       }
//     ]
//   });

// class HistoryPost extends Component {
//     constructor(props){
//         super(props);
//         this.state= {

//         }
//     }

//      componentWillMount(){
//          let that = this;
//         var ref = firebaseApp.database().ref('PostSale');
//         var query = ref.orderByChild('Username').equalTo(this.props.mystate);
//         query.once('value', function(snapshot){
//             snapshot.forEach(function(child){
//                  that.setState({
//                     nameacount: child.val().Username,
//                     lantitude : child.val().latitude,
//                     longtitude : child.val().longitude
//                  })

//             })
//         })
//      }
//     render() {
//         const { } = style;
//             const { imageuser } = this.state;
//         return (  
//             <Container>
                
//             </Container>
//         )
//      }
// }

// const style = StyleSheet.create({

// });
// const mapStateToProps = (state) =>({
//     mystate : state.checkLogin.user
// })

// export default connect(mapStateToProps)(HistoryPost);
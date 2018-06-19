import React, {Component} from 'react'
import {View, Image,Text,StyleSheet,Dimensions, ScrollView,Alert, TouchableOpacity, Linking} from 'react-native';
import Communications from 'react-native-communications';

import phone from '../../picture/phone.png';
import sms from '../../picture/sms.png';
import brand from '../../picture/brand.png';
import km from '../../picture/km.png';
import steering from '../../picture/steering.png';
import calendar from '../../picture/calendar.png';
import kind from '../../picture/kind.png';
import status from '../../picture/status.png';
import color from '../../picture/paint.png';

const{width,height} = Dimensions.get('window');

class Detail extends Component{
    constructor(props){
        super(props);

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
            this.props.navigator.pop();
        }
    }
    Callphone(){
        const { myphone } = this.props;
        Communications.phonecall(myphone, true);
    }
    SendMessage(){
        const { myphone } = this.props;
        Communications.text(myphone);
    }
    
    render(){
        const {container,main,bbar,contactButton,contactText,icon,
            ImageItemView,ImageItem,tittleView,tittle,price,dayPost,hr,
            detailView,userView,userImageView,userInfoView,avatarUser,
            name,place,contentInfo,detailProduct,leftColumn,ItemView,detailItem,note
        } = style;
        const { myimage,myname,myemail,mylocal,mydate,myphone,myacount,mystate, mysex
         } = this.props;
        return(
            
            <View style={container}>
                <ScrollView style={main}>
                <View style={ImageItemView}>
                   <Image source={{uri : this.props.myimage }} style={ImageItem}/>
                </View>
                <View style={detailView}> 
                <View style={tittleView}>
                    <Text style={tittle}>Email: { myemail }</Text>
                    <Text style={price}>Gioi tinh : {mysex}</Text>
                    <Text style={dayPost}>Ngay: { mydate }</Text>
                </View>

                <View style={hr}></View>

                <View style={userView}>
                    <View style={userImageView}>
                        <Image source={{uri : myimage}} style={avatarUser}/>
                    </View>
                    <View style={userInfoView}>
                        <Text style={name}>{myname}</Text>
                        <Text style={place}>Dia chi : {mylocal}</Text>
                    </View>
                </View>
                
                <View style={hr}></View>

                 <Text style={contentInfo}>
                 {myacount}
                 </Text>
                
                <View style={detailProduct}>
                    <View style={leftColumn}>

                        <View style={ItemView}>
                            <Image source={brand} style={detailItem}/>
                            <Text style={note}>{myphone}</Text>
                        </View>
                        <View style={ItemView}>
                            <Image source={calendar} style={detailItem}/>
                            <Text style={note}>{mystate}</Text>
                        </View>
                        <View style={ItemView}>
                            <Image source={status} style={detailItem}/>
                            <Text style={note}>Đã sử dụng</Text>
                        </View>
                        <View style={ItemView}>
                            <Image source={color} style={detailItem}/>
                            <Text style={note}>Màu đỏ</Text>
                        </View>
                    </View>
                    <View style={leftColumn}>

                        <View style={ItemView}>
                            <Image source={kind} style={detailItem}/>
                            <Text style={note}>Civic</Text>
                        </View>
                        <View style={ItemView}>
                            <Image source={km} style={detailItem}/>
                            <Text style={note}>4000-10000</Text>
                        </View>
                        <View style={ItemView}>
                            <Image source={steering} style={detailItem}/>
                            <Text style={note}>Xe gar</Text>
                        </View>

                    </View>
                </View>

                </View>
                
                </ScrollView>
                <View style={bbar}>
                    <TouchableOpacity style={contactButton}
                    onPress={ () => this.Callphone()}
                    >
                        <Image source={phone} style={icon}/> 
                        <Text style={contactText}>Gọi điện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={contactButton}
                    onPress={ () => this.SendMessage() }
                    >
                        <Image source={sms} style={icon}/> 
                        <Text style={contactText}>Nhắn tin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        }
    }
const style = StyleSheet.create({
    container:{
        flex:1
    },
    main:{
        flex:1,
        backgroundColor:'white'
    },
    bbar:{
        width: width,
        height: 70,
        flexDirection: 'row'
      },
    contactButton:{
        padding:8,
        backgroundColor:'#f58a3ed1',
        flex:1,
        alignItems: 'center',
    },
    icon:{
        width: 25,
        height:25,
        marginBottom: 5
    },
    contactText:{
        backgroundColor: 'transparent',
        color:'white',
        fontSize: 18
    },
    ImageItemView:{

    },
    ImageItem:{
        width: width,
        height: 250
    },
    detailView:{
        padding:8
    },
    tittleView:{
    },
    tittle:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent'
    },
    price:{
        lineHeight:30,
        fontSize:12,
        fontWeight: 'bold',
        color:'red',
        backgroundColor: 'transparent'
    },
    dayPost:{
        fontSize:11,
        color:'gray',
        backgroundColor: 'transparent'
    },
    hr:{
        marginTop:8,
        marginBottom:8,
        borderColor:'#d0d0d0',
        borderBottomWidth: 0.5
    },
    userView:{
        flexDirection:'row'
    },
    userImageView:{
        borderRadius: 25,
        marginRight: 10
    },
    avatarUser:{
        width:50,
        height:50
    },
    name:{
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        lineHeight: 30
    },
    place:{
        fontSize:12,
        color:'#6485a7'
    },
    detailProduct:{
        paddingTop: 10,
        flexDirection: 'row'
    },
    leftColumn:{
        flex:1,
        paddingLeft: 10
    },
    ItemView:{
        flexDirection: 'row',
        padding:10,
    },
    detailItem:{
        width:25,
        height:25,
        marginRight: 10
    },
    note:{
        color: 'black'
    }


});
export default Detail;
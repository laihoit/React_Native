import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Container, InputField } from '../component/index';
import { connect } from 'react-redux';
import DB from '../database/DB';
import ImagePicker from 'react-native-image-picker';
import * as AttachmentActor from '../attachment/action';

import avatar from '../../picture/avatar.png';
import camera from '../../picture/camera.png';

var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: '/Attachments/Application/'
    }
};

class EditPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameacount: '',
            lantitude: '',
            longtitude: '',
            pass: '',
            avatarSource: '',
            imageuser: ''
        }
    }

    componentDidMount() {
        const { user } = this.props;
        DB.db().transaction((tx) => {
            var sql = 'SELECT * FROM Lai WHERE name=\'' + user + '\'';
            tx.executeSql(sql, [], (tx, results) => {
                var len = results.rows.lenght;
                if (len == 0 && this.props.username == '') {
                    Alert.alert('Bạn cần phải đăng nhập!');
                } else {
                    var row = results.rows.item(0);
                    this.setState({ nameacount: row.name, lantitude: row.locationlan, longtitude: row.locationlong, pass: row.pass, imageuser: row.image })
                }
            })
        })
    }
    UpdateUser() {
        const { user } = this.props;
        const { lantitude, longtitude, avatarSource } = this.state;
        DB.db().transaction((tx) => {
            var sql = 'UPDATE Lai SET image=\'' + avatarSource + '\', locationlan=\'' + lantitude + '\', locationlong=\'' + longtitude + '\' WHERE name=\'' + user + '\'';
            tx.executeSql(sql, [], (tx, result) => {
                this.props.navigator.push({
                    screen: 'Person',
                })
                Alert.alert('Update success!!')
            })
        })
    }
    getImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
             console.log('abc ' + response.uri );
                AttachmentActor.saveImage(response.uri)
                    .then(response => {
                        this.setState({
                            avatarSource: response
                        });
                    })
                    .catch(error => console.log(error))

            }
        });

    }
    render() {
        const { container, imgInfo, nameAndAvatarView, avatarImgInfo, avatarView, editView, editIcon, myInfo, nameInfo, nameText
            , itemEdit, editText, button, editButtonView, editButtonText } = style;
        const { nameacount, lantitude, longtitude, pass, avatarSource, imageuser } = this.state;
        return (
            <Container>
                <ScrollView style={container} >
                    <View style={myInfo}>
                        <View style={nameAndAvatarView}>
                            <View style={imgInfo}>
                                <View style={avatarView}>
                                    <Image source={{ uri: avatarSource ? AttachmentActor.getMediaPath(avatarSource) : AttachmentActor.getMediaPath(imageuser) }} style={avatarImgInfo} />
                                </View>
                                <TouchableOpacity style={editView}
                                    onPress={() => this.getImagePicker()}
                                >
                                    <Image source={camera} style={editIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={nameInfo} >
                                <Text style={nameText}>Họ và tên</Text>
                                <InputField placeholder="Đổi tên ở đây"
                                    placeholderTextColor="#22222226"
                                    onChangeText={(nameacount) => {
                                        this.setState({ nameacount })
                                    }}
                                    value={nameacount}
                                    editable={false}
                                />
                            </View>
                        </View>
                        <View style={itemEdit} >
                            <Text style={editText}>Số điện thoại</Text>
                            <InputField placeholder="Đổi số điện thoại"
                                placeholderTextColor="#22222226"
                                onChangeText={(lantitude) => {
                                    this.setState({ lantitude })
                                }}
                                value={lantitude}
                            />
                        </View>

                        <View style={itemEdit} >
                            <Text style={editText}>Email</Text>
                            <InputField placeholder="Đổi email"
                                placeholderTextColor="#22222226"
                                onChangeText={(longtitude) => {
                                    this.setState({ longtitude })
                                }}
                                value={longtitude}
                            />
                        </View>

                        <View style={itemEdit} >
                            <Text style={editText}>Địa chỉ</Text>
                            <InputField placeholder="Đổi địa chỉ"
                                placeholderTextColor="#22222226"

                            />
                        </View>
                        <View style={itemEdit} >
                            <Text style={editText}>Mật khẩu</Text>
                            <InputField placeholder="Đổi mật khẩu"
                                placeholderTextColor="#22222226"
                                onChangeText={(pass) => {
                                    this.setState({ pass })
                                }}
                                value={pass}
                                editable={false}
                            />
                        </View>
                    </View>
                    <View style={editButtonView}>
                        <TouchableOpacity style={button} onPress={() => this.UpdateUser()} >
                            <Text style={editButtonText}>{'Đổi thông tin'.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5
    },
    myInfo: {
        paddingBottom: 20,
    },
    nameAndAvatarView: {
        flexDirection: 'row',
        marginBottom: 25
    },
    imgInfo: {
        borderRadius: 48,
        marginRight: 10,
        flexDirection: 'row'
    },
    editView: {
        position: 'absolute',
        right: 0,
        bottom: 5
    },
    editIcon: {
        width: 20,
        height: 20,
    },
    avatarView: {
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#22222226'
    },
    avatarImgInfo: {
        width: 60,
        height: 60,
        borderRadius: 25
    },
    nameInfo: {
        padding: 8,
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#22222226'
    },
    itemEdit: {
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 10
    },
    editButtonView: {
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
    },
    button: {
        padding: 5,
        backgroundColor: '#3880b3d9',
        borderRadius: 25,
        alignItems: 'center'
    },
    editButtonText: {
        fontSize: 15,
        color: 'white',

    }

});
const mapStateToProps = (state) => ({
    user: state.checkLogin.user
})

export default connect(mapStateToProps)(EditPerson);
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Button, TextInput, ScrollView } from 'react-native';
import camera from '../../picture/camera.png';
import { CustomPicker } from 'react-native-custom-picker';
import { InputField } from '../component/index';
import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


class PostRent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            isShow: false,
            arrayImage: [null],
            nameCar: '',
            loaixe: '',
            hangxe: '',
            address: '',
            money: '',
            numberKm: '',
            tinhtrang: '',
            mauxe: '',
            namSx: '',
            biensoxe: '',
            latitude: '',
            longitude: ''
        }
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
                let source = { uri: response.uri };
                this.setState({
                  avatarSource: source
                });

            }
        });
        

    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })

        }, (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }
    render() {
        const loaixe = ['xe ô tô', 'xe máy', 'xe tải', 'xe đạp', 'xe điện', 'xe khác'];
        const hangxe = ['yamaha', 'Nova', 'Suzuki', 'Honda', 'Lexus', 'Mitsubishi', 'Jeep', 'Huynhdai', 'Hãng khác'];
        const tinhtrang = ['Đã sử dụng', 'Chưa sử dụng'];
        const mauxe = ['Đỏ', 'xanh', 'Vàng', 'Đen', 'Trắng', 'xám', 'Màu khác'];
        const { wapper, title, viewtitle, imageStyle, viewStyle,
            titlecom, customView, inputType, btnSubmit } = styles;
        return (
            <ScrollView>
                <View style={wapper} >
                    <View style={viewtitle} >
                        <TouchableOpacity>
                            <Text>Trở về</Text>
                        </TouchableOpacity>
                        <Text style={title} >{'Đăng tin'.toUpperCase()}</Text>
                    </View>
                    <View style={viewStyle} >
                        <TouchableOpacity onPress={() => this.getImagePicker()} >
                            <Image source={this.state.avatarSource ? this.state.avatarSource : camera} style={imageStyle} />
                            <Text>Chọn hình ảnh xe</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={titlecom} >Thông tin xe</Text>
                        <View style={inputType} >
                            <InputField
                                placeholder="Tên xe"
                                onChangeText={(nameCar) => this.setState({ nameCar })}
                                value={this.state.nameCar}
                            />
                        </View>
                        <View style={customView} >
                            <CustomPicker
                                placeholder="Loại xe"
                                options={loaixe}
                                onValueChange={(value) => {
                                    this.setState({ loaixe: value })
                                }}
                            />
                        </View>
                        <View style={customView} >
                            <CustomPicker
                                placeholder="Hãng xe"
                                options={hangxe}
                                onValueChange={(value) => {
                                    this.setState({ hangxe: value })
                                }}
                            />
                        </View>
                        <View style={inputType} >
                            <InputField
                                placeholder="Ghi rõ địa chỉ"
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address}
                            />
                        </View>
                        <View style={inputType} >
                            <InputField
                                placeholder="Giá bán xe"
                                onChangeText={(money) => this.setState({ money })}
                                value={this.state.money}
                            />
                        </View>
                        <View style={inputType} >
                            <InputField
                                placeholder="Số Km đã chạy"
                                onChangeText={(numberKm) => this.setState({ numberKm })}
                                value={this.state.numberKm}
                            />
                        </View>
                        <View style={customView} >
                            <CustomPicker
                                placeholder="Tình trạng"
                                options={tinhtrang}
                                onValueChange={(value) => {
                                    this.setState({ tinhtrang: value })
                                }}
                            />
                        </View>
                        <View style={customView} >
                            <CustomPicker
                                placeholder="Màu xe"
                                options={mauxe}
                                onValueChange={value => {
                                    this.setState({ mauxe: value })
                                }}
                                placeholderTextColor='red'
                            />
                        </View>
                        <View style={inputType} >
                            <InputField
                                placeholder="Năm sản xuất"
                                onChangeText={(namSx) => this.setState({ namSx })}
                                value={this.state.namSx}
                            />
                        </View>
                        <View style={inputType} >
                            <InputField
                                placeholder="Biển số xe"
                                onChangeText={(biensoxe) => this.setState({ biensoxe })}
                                value={this.state.biensoxe}
                                placeholderTextColor="#000"
                            />
                        </View>
                        <View style={inputType}>
                            <InputField 
                                value={this.state.latitude + ", " + this.state.longitude}
                                editable={false}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={btnSubmit} >
                            <Text style={{ textAlign: 'center', color: '#fff' }} >Đăng tin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    title: {
        width: width - 80,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 30
    },
    wapper: {
        backgroundColor: '#fff'
    },
    viewtitle: {
        flexDirection: 'row',
        marginTop: 10
    },
    imageStyle: {
        width: width / 3,
        height: height / 8
    },
    viewStyle: {
        width: width - 50,
        height: height / 5,
        backgroundColor: '#D8D8D8',
        borderRadius: 5,
        borderWidth: 0.5,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    btnnext: {
        width: width / 4,
        height: height / 20,
        backgroundColor: '#2E64FE',
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 5,
        alignSelf: 'flex-end',
        marginRight: 25
    },
    titlecom: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center'
    },
    customView: {
        width: width,
        justifyContent: 'center'
    },
    inputType: {
        width: width - 20,
        marginLeft: 10,
        height: 60
    },
    btnSubmit: {
        width: width - 50,
        height: height / 18,
        backgroundColor: '#0174DF',
        borderRadius: 15,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
});
export default PostRent;
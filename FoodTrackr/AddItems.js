import React, { Component } from 'react';
import {
    Text, StyleSheet, View, TextInput, Alert,
    TouchableHighlight, TouchableOpacity, Dimensions,
    AsyncStorage, Image
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modal';
import { Constants, } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation';

var darkMode;
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class AddItemsScreen extends React.Component {

    static navigationOptions = {
        title: 'Add Inventory Items',
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
            backgroundColor: '#99ccff'
        },
    };

    componentWillMount() {
        AsyncStorage.getItem('darkMode', (err, result) => {
            if (result == 'true') {
                darkMode = true;
            }
            else {
                darkMode = false;
            }
        })
    }

    state = {
        text: '',
        text1: '',
        date: 0,
        loading: false,
        visible: false,
        color1: darkMode ? '#808080' : '#e6eeff'
    };

    componentDidMount() {
        this._isMounted = true;
        AsyncStorage.getItem('darkMode', (err, result) => {
            if ((this.state.color1 == '#808080' && result == 'false') || (this.state.color1 == '#e6eeff' && result == 'true'))
                if (this._isMounted)
                    this.reset()
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    checkText = () => {
        var input = this.state.text;
        if (input.match(/[^A-Za-z ]/)) {
            Keyboard.dismiss();
            Alert.alert('Invalid Data', 'Only letters and spaces are allowed.');
        }
        else if (this.prevInput == input) {
            Keyboard.dismiss();
        }
        else {
            this.prevInput = input;
            this.setState()
        }
    };

    checkNums = () => {
        var input = this.state.text1;
        if (input.match(/[^0-9 ]/)) {
            Keyboard.dismiss();
            Alert.alert('Invalid Data', 'Only numbers are allowed.');
        }
        else if (this.prevInput == input) {
            Keyboard.dismiss();
        }
        else {
            this.prevInput = input;
            this.setItemName();
        }
    };

    sortInventory = () => {

    }

    setItem = () => {
        var item = { itemName: this.state.text, expirationDate: this.state.date };
        AsyncStorage.getItem('inventory', (err, result) => {
            if (result) {
                for (i = 0; i < result.length; i++) {
                    var data = JSON.parse(result[i]);
                    var data1 = JSON.parse(result[i + 1]);
                    if ((parseInt(data.expirationDate) < this.state.date) && (parseInt(data1.expirationDate) > this.state.date)) {
                        AsyncStorage.setItem('inventory', result.splice(i, 0, item));
                    } else if (parseInt(data.expirationDate) == this.state.date) {
                        if (data.charAt(0) >= this.state.text.charAt(0)) {
                            AsyncStorage.setItem('inventory', result.splice((i - 1), 0, item));
                        }
                    } else if (i == result.length - 1) {
                        AsyncStorage.setItem('inventory', result.splice(i, 0, item));
                    }
                }
            }
            else {
                AsyncStorage.setItem('inventory', item);
            }
        })
        const backAction = NavigationActions.back({});
        this.props.navigation.dispatch(backAction);
    }

    /*setItem = () => {
        var item = {itemName: this.state.text, expirationDate: this.state.date};
        AsyncStorage.getItem('inventory', (err, result) => {
            if (result) {
                AsyncStorage.setItem('inventory', JSON.stringify(JSON.parse(result).concat(item)));
            }
            else {
                AsyncStorage.setItem('inventory', JSON.stringify([item]));
            }
        })
        const backAction = NavigationActions.back({});
        this.props.navigation.dispatch(backAction);
    }*/

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: this.state.color1, alignItems: 'flex-start', }}>
                <View style={{ height: (screenWidth * 0.17) - Constants.statusBarHeight}}>
                    <TextInput style={{ height: (screenWidth * 0.10), width: screenWidth, }}
                        placeholder="Item name..."
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        onSubmitEditing={this.checkText}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <DatePicker
                        style={{ height: (screenWidth * 0.40) - (screenWidth * 0.10) - Constants.statusBarHeight, width: screenWidth }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYYMMDD"
                        minDate="2017-11-01"
                        maxDate="2019-11-30"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: parseInt(date) }) }}
                    />
                </View>
                <View style={{ height: screenWidth * 0.30, width: screenWidth * 0.30, justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <TouchableHighlight style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => this.setItem()}>
                        <Image
                            style={{ height: screenWidth * 0.30, width: screenWidth * 0.30 }}
                            source={require('./Assets/addItemButton.png')}
                        />
                    </TouchableHighlight>
                </View>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({

});
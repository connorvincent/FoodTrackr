import React, { Component } from 'react';
import {
    Text, StyleSheet, View, TextInput, Alert,
    TouchableHighlight, TouchableOpacity, Dimensions,
    AsyncStorage, Image, Keyboard
} from 'react-native';
import DatePicker from 'react-native-datepicker'
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
        date: "",
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
        var today = new Date();
        this.setState({ date: today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" + today.getDate() })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reset() {
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Inventory', params: {}, }),
                NavigationActions.navigate({ routeName: 'AddItems', params: {}, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    checkText = () => {
        var input = this.state.text;
        if (input.match(/[^A-Za-z ]/)) {
            Keyboard.dismiss();
            Alert.alert('Invalid Data', 'Only letters and spaces are allowed.');
        }
        else if(!input) {
            Alert.alert('Invalid Data', 'Input may not be blank');
        }
        else if (this.prevInput == input) {
            Keyboard.dismiss();
        }
        else {
            this.prevInput = input;
        }
    };
    
    setItem = () => {
        var input = this.state.text;
        if (input.match(/[^A-Za-z ]/)) {
            Alert.alert('Invalid Data', 'Only letters and spaces are allowed.');
        }
        else if(!input) {
            Alert.alert('Invalid Data', 'Input may not be blank');
        }
        else {
            var item = {itemName: this.state.text, expirationDate: this.state.date};
            AsyncStorage.getItem('inventory', (err, result) => {
                if (result && result) {
                    var parsedResult = JSON.parse(result).concat([item]);
                    for(i = 0; i < parsedResult.length; i++) {
                        parsedResult[i].expirationDate = parseInt(parsedResult[i].expirationDate.replace(/-/g, ""));
                    }
                    parsedResult.sort(function (a, b) {
                        return a.expirationDate - b.expirationDate;
                    });
                    for(i = 0; i < parsedResult.length; i++) {
                        parsedResult[i].expirationDate = `${parsedResult[i].expirationDate}`;
                    }
                    AsyncStorage.setItem('inventory', JSON.stringify(parsedResult));
                }
                else {
                    AsyncStorage.setItem('inventory', JSON.stringify([item]));
                }
            })
            this.resetToInventory();
        }
    }

    resetToInventory() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Inventory', params: {}, })
            ]
        });

        setTimeout(() => {
            this.props.navigation.dispatch(resetAction);
        }, 500);
    }

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
                        format="YYYY-MM-DD"
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
                        onDateChange={(date) => { this.setState({ date: date }) }}
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
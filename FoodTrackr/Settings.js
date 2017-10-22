import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, Alert,
    List, FlatList, ListItem, SearchBar, Button, Switch
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants, } from 'expo';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class RecipesScreen extends React.Component {

    state = {
        switchValue: false
    };
    state = {
        switchValue2: true
    };

    //Switch Handlers
    _handleToggleSwitch = () => this.setState(state => ({
        switchValue: !state.switchValue
    }));
    _handleToggleSwitch2 = () => this.setState(state => ({
        switchValue2: !state.switchValue2
    }));

    // About button handler
    _onPress() {
        Alert.alert('About Team B.A.C.K screen appears here');
    }

    static navigationOptions = {
        title: 'Settings',
        headerLeft: null,
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
            backgroundColor: '#99ccff'
        },
    };


    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={{
                flex: 1,
                backgroundColor: '#e6eeff',
            }}>

                {/* Toggle Dark Theme */}
                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 25 }}>
                        Toggle Dark Theme
                    </Text>
                    <Switch
                        onValueChange={this._handleToggleSwitch}
                        value={this.state.switchValue}
                    />
                </View>


                {/* Button for push notifications */}
                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 25 }}>
                        Receive Push Notifications
                </Text>
                    <Switch
                        onValueChange={this._handleToggleSwitch2}
                        value={this.state.switchValue2}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button onPress={this._onPress} title="About Team B.A.C.K" color="#99ccff" accessibilityLabel="Tap on Me"/>
                </View>

               {/* Nav bar */}
                <View style={styles.buttonLayout}>

            <View style={styles.aMenu}>
                <View style={styles.bMenu}>
                    <TouchableOpacity onPress={() => navigate('Inventory')}>
                        <Image source={require('./Assets/clipboard.png')} style={styles.mButtons} />
                    </TouchableOpacity>
                </View>
                <View style={styles.bMenu}>
                    <TouchableOpacity onPress={() => navigate('Recipes')}>
                        <Image source={require('./Assets/book.png')} style={styles.mButtons} />
                    </TouchableOpacity>
                </View>
                <View style={styles.bMenu}>
                    <TouchableOpacity onPress={() => navigate('Planner')}>
                        <Image source={require('./Assets/calendar.png')} style={styles.mButtons} />
                    </TouchableOpacity>
                </View>
                <View style={styles.bMenu}>
                    <TouchableOpacity>
                        <Image source={require('./Assets/aSettings.png')} style={styles.mButtons} />
                    </TouchableOpacity>
                </View>
            </View>
                </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({

    containerSwitch: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
    },

    aMenu: {
        height: screenHeight * 0.10,
        width: screenWidth,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    bMenu: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    mButtons: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9E24',
    },

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonLayout: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    buttonContainer: {
    backgroundColor: '#000000',
    borderRadius: 4,
    padding: 1,
    shadowColor: '#FF9E24',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  }


});
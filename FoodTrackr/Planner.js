import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class PlannerScreen extends React.Component {

    static navigationOptions = {
        title: 'Planner',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.bMenu}>
                <TouchableOpacity onPress={() => navigate('Inventory')}>
                    <View style={styles.bMenu}>
                        <Image source={require('./Assets/clipboard.png')} style={styles.mButtons} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Recipes')}>
                    <View style={styles.bMenu}>
                        <Image source={require('./Assets/book.png')} style={styles.mButtons} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.bMenu}>
                        <Image source={require('./Assets/calendar.png')} style={styles.aButton} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Settings')}>
                    <View style={styles.bMenu}>
                        <Image source={require('./Assets/settings.png')} style={styles.mButtons} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    bMenu: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mButtons: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9E24',
    },
    aButton: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D3D3D3',
    },

});
import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, FlatList, ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class InventoryScreen extends React.Component {

    static navigationOptions = {
        title: 'Inventory',
        headerLeft: null,
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.top}>
                <View style={{ height: screenHeight * 0.75 }}>

                </View>
                <View style={styles.bMenu}>
                    <View style={styles.bMenu}>
                        <TouchableOpacity>
                            <Image source={require('./Assets/clipboard.png')} style={styles.aButton} />
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
                        <TouchableOpacity onPress={() => navigate('Settings')}>
                            <Image source={require('./Assets/settings.png')} style={styles.mButtons} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    top: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'flex-start',
    },

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
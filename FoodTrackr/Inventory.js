import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, StatusBar,
    FlatList, Alert, Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { List, ListItem } from 'react-native-elements';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var Items = require('./Assets/ExampleInventory.json');

export default class InventoryScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Inventory',
        headerLeft: (
            <View style={{ height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <View>
                        <Image source={require('./Assets/addItems.png')} style={{ height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff', }}/>
                    </View>
                </TouchableOpacity>
            </View>
        ),
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
            backgroundColor: '#99ccff'
        },
    });

    /*_onPress() {
        Alert.alert('Will allow search for item.');
    }*/

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#e6eeff',
                alignItems: 'flex-start',
            }}>

                <View style={{ flex: 1, width: (screenWidth), }}>
                    <List containerStyle={{ marginTop: 0 }}>
                        <FlatList
                            data={Items.inventoryItems}
                            keyExtractor={item => item.itemName}
                            renderItem={({ item }) => (
                                //<TouchableOpacity onPress={this._onPress()}>
                                    <ListItem
                                        title={item.itemName}
                                        subtitle={item.timeLeft}
                                    />
                                //</TouchableOpacity>
                            )}
                        />
                    </List>
                </View>
                <View style={{
                    width: screenWidth,
                    height: screenHeight * 0.10,
                    flexDirection: 'row',
                    backgroundColor: '#F5FCFF',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }} >
                    <View style={styles.bMenu}>
                        <View style={styles.bMenu}>
                            <TouchableOpacity>
                                <Image source={require('./Assets/aClipboard.png')} style={styles.mButtons} />
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

    aButton: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99ccff',
    },

});

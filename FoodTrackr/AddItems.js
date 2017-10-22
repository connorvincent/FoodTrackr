import React, { Component } from 'react';
import {
    ActivityIndicator, ListView, Text,
    StyleSheet, AppRegistry, View, Dimensions
} from 'react-native';
import { Constants, } from 'expo';
import { StackNavigator } from 'react-navigation';

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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This screen will have take in new items.</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

});
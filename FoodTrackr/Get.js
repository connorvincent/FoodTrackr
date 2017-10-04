import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, WebView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants, } from 'expo';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var url;

export default class GetScreen extends React.Component {

    static navigationOptions = {
        title: 'Get Recipe',
        headerRight: <Text style={{
            color: '#0000ff',
            fontSize: 10,
        }}>Powered By Food2Fork.com</Text>,
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
            backgroundColor: '#99ccff'
        },
    };

    state = {
        data: [],
    };

    componentWillMount() {
        url = this.props.navigation.state.params.f2f_url;
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <WebView
                source={{ uri: url }}
                style={{ marginTop: 0 }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});
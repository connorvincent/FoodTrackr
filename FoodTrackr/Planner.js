import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, Alert, FlatList
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants,} from 'expo';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class PlannerScreen extends React.Component {
	constructor(props) {
		super(props);
	}
    static navigationOptions = {
        title: 'Planner',
        headerLeft: null,
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
        },
    };


    render() {
		var menus = [
			{key: "This is where the menus will appear when I can get them working. I am using the text as a placeholder so it doesn't throw an empty key error."}
		];
        const { navigate } = this.props.navigation;
        return (
			
            <View style={styles.top}>
                <View style={{ height: (screenHeight * 0.75) - Constants.statusBarHeight }}>
					<FlatList
				data = {menus}
				renderItem = {
				({item}) => <Text>{item.key}</Text>
				}
				>
				</FlatList>
                </View>
                <View style={styles.bMenu}>
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
                        <TouchableOpacity>
                            <Image source={require('./Assets/calendar.png')} style={styles.aButton} />
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
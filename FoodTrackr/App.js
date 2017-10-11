import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import InventoryScreen from './Inventory';
import RecipesScreen from './Recipes';
import PlannerScreen from './Planner';
import SettingsScreen from './Settings';
import GetScreen from './Get';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

const navigate = StackNavigator({
    Inventory: { screen: InventoryScreen },
    Recipes: { screen: RecipesScreen },
    Planner: { screen: PlannerScreen },
    Settings: { screen: SettingsScreen },
    Get: { screen: GetScreen },
}, {
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
            },
        }),
    });
export default navigate;

const styles = StyleSheet.create({

});
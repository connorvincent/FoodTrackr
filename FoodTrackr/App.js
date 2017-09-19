import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import InventoryScreen from './Inventory';
import RecipesScreen from './Recipes';
import PlannerScreen from './Planner';
import SettingsScreen from './Settings';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

const navigate = StackNavigator({
    Inventory: { screen: InventoryScreen },
    Recipes: { screen: RecipesScreen },
    Planner: { screen: PlannerScreen },
    Settings: { screen: SettingsScreen },
});
export default navigate;

const styles = StyleSheet.create({

});
import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, StatusBar,
    FlatList, Alert, Button
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Constants } from 'expo';
import { List, ListItem } from 'react-native-elements';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var Items = require('./Assets/ExampleInventory.json');

export default class InventoryScreen extends React.Component {

    static navigationOptions = ({ navigation}) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Inventory',
            headerLeft: (
                <View style={{ height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                        <View>
                            <Image source={require('./Assets/addItems.png')} style={{ height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff', }} />
                        </View>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: (
                <View style={{ height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => params.handleThis(navigation.navigate) }>
                        <View>
                            <Image source={require('./Assets/magnifier.png')} style={{ height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff', }} />
                        </View>
                    </TouchableOpacity>
                </View>
            ),
            headerStyle: {
                paddingTop: Constants.statusBarHeight,
                height: 60 + Constants.statusBarHeight,
                backgroundColor: '#99ccff'
            },
            gesturesEnabled: false,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: [],
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleThis: this.search
        });
        var checkedItems = [];
        for (i = 0; i < Items.inventoryItems.length; i++) {
            checkedItems = checkedItems.concat([null]);
        }
        this.setState({ checkedItems: checkedItems,})
    }

    search = (navigate) => {
        var request = '';
        for (i = 0; i < Items.inventoryItems.length; i++) {
            if(this.state.checkedItems[i] != null) {
                request += this.state.checkedItems[i] + ', ';
            }
        }
        request = request.slice(0, -2); //remove last 2 characters
        navigate('Recipes', { input: `${request}` });
    }

    check = (item, index) => {
        var checked = this.state.checkedItems[index] != null;
        var newCheckedItems = this.state.checkedItems;
        !checked ? newCheckedItems.splice(index, 1, item.itemName) : newCheckedItems.splice(index, 1, null)
        this.setState({ checkedItems: newCheckedItems})
    }

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
                            extraData={this.state}
                            keyExtractor={(x, i) => i}
                            renderItem={({ item, index}) => (
                                <ListItem
                                    title={item.itemName}
                                    subtitle={item.timeLeft}
                                    rightIcon={
                                        <TouchableOpacity onPress={() => this.check(item, index)}>
                                            <Image source={this.state.checkedItems[index] != null ?
                                                require('./Assets/check_box.png') : require('./Assets/check_box_outline.png')}
                                                style={{ backgroundColor: '#99ccff', }} />
                                        </TouchableOpacity>
                                    }
                                />
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
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Recipes', params: { input: "", redirectToPlanner: "" } })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                                <Image source={require('./Assets/book.png')} style={styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bMenu}>
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Planner', params: { item: ""} })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                                <Image source={require('./Assets/calendar.png')} style={styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bMenu}>
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Settings', params: {}, })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
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

    search: {
        backgroundColor: '#d3d3d3', 
        height: screenHeight * 0.05, 
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
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

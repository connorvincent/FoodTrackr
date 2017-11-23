import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, StatusBar,
    FlatList, Alert, AsyncStorage
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Constants } from 'expo';
import { List, ListItem } from 'react-native-elements';

var darkMode;
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var Items = require('./Assets/ExampleInventory.json');

export default class InventoryScreen extends React.Component {

    componentWillMount() {
        AsyncStorage.getItem('darkMode', (err, result) => {
            if(result == 'true') {
                darkMode = true;
            }
            else {
                darkMode = false;
            }
        })
    }

    state = {
        checkedItems: [],
        color: darkMode ? '#99ccff' : '#99ccff',
        color1: darkMode ? '#808080': '#e6eeff' ,
        color2: darkMode ? '#808080' : '#F5FCFF',
        color3: darkMode ? '#f4a460' : '#FF9E24',
        color4: darkMode ? '#808080' : '#d3d3d3',
        color5: darkMode ? '#99ccff' : '#808080',
        color6: darkMode ? '#00ffff' : '#333333'
    };

    componentDidMount() {
        this._isMounted = true;
        AsyncStorage.getItem('darkMode', (err, result) => {
            if(this._isMounted) {
                this.setState({ switchValue: (result == 'true') });
            }
            if((this.state.color1 == '#808080' && result == 'false') || (this.state.color1 == '#e6eeff' && result == 'true'))
                if(this._isMounted)
                    this.reset()
         })
         this.props.navigation.setParams({
            handleThis: this.search
        });
        var checkedItems = [];
        for (i = 0; i < Items.inventoryItems.length; i++) {
            checkedItems = checkedItems.concat([null]);
        }
        if(this._isMounted) {
            this.setState({ checkedItems: checkedItems,})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
   }

    reset() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Inventory', params: {}, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

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
                    <TouchableOpacity onPress={() => params.handleThis() }>
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

    search = () => {
        var request = '';
        for (i = 0; i < Items.inventoryItems.length; i++) {
            if(this.state.checkedItems[i] != null) {
                request += this.state.checkedItems[i] + ', ';
            }
        }
        request = request.slice(0, -2); //remove last 2 characters
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Recipes', params: { input: `${request}`, redirectToPlanner: "" } })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    check = (item, index) => {
        var checked = this.state.checkedItems[index] != null;
        var newCheckedItems = this.state.checkedItems;
        !checked ? newCheckedItems.splice(index, 1, item.itemName) : newCheckedItems.splice(index, 1, null)
        if(this._isMounted) {
            this.setState({ checkedItems: newCheckedItems})
        }
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
                    <List containerStyle={{ marginTop: 0, backgroundColor: this.state.color1 }}>
                        <FlatList
                            data={Items.inventoryItems}
                            extraData={this.state}
                            keyExtractor={(x, i) => i}
                            renderItem={({ item, index}) => (
                                <ListItem
                                    title={item.itemName}
                                    titleStyle={{ color: this.state.color6 }}
                                    subtitleStyle={{ color: this.state.color5 }}
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
                    <View style={this.styles.bMenu}>
                        <View style={this.styles.bMenu}>
                            <TouchableOpacity>
                                <Image source={require('./Assets/aClipboard.png')} style={this.styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                        <View style={this.styles.bMenu}>
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Recipes', params: { input: "", redirectToPlanner: "" } })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                                <Image source={require('./Assets/book.png')} style={this.styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                        <View style={this.styles.bMenu}>
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Planner', params: { item: ""} })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                                <Image source={require('./Assets/calendar.png')} style={this.styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                        <View style={this.styles.bMenu}>
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Settings', params: {}, })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                                <Image source={require('./Assets/settings.png')} style={this.styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    styles = StyleSheet.create({

        top: {
            flex: 1,
            backgroundColor: this.state.color2,
            alignItems: 'flex-start',
        },
    
        search: {
            backgroundColor: this.state.color4, 
            height: screenHeight * 0.05, 
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth,
        },    

        containerSwitch: {
            flex: 1,
            alignItems: 'center',
            marginTop: 100
        },
    
        aMenu: {
            height: screenHeight * 0.10,
            width: screenWidth,
            flexDirection: 'row',
            backgroundColor: this.state.color2,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
    
        bMenu: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: this.state.color2,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
    
        mButtons: {
            width: screenWidth * 0.25,
            height: screenHeight * 0.10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.state.color3,
        },
    
        container: {
            flex: 1,
            backgroundColor: this.state.color2,
            alignItems: 'center',
            justifyContent: 'center',
        },
    
        buttonLayout: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: this.state.color2,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
    });
}
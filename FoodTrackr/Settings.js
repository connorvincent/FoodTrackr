import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, Alert, AsyncStorage,
    List, FlatList, ListItem, SearchBar, Switch
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Constants, } from 'expo';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var darkMode;

export default class SettingsScreen extends React.Component {

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
        switchValue: false,
        switchValue2: true,
        color: darkMode ? '#99ccff' : '#99ccff',
        color1: darkMode ? '#808080': '#e6eeff' ,
        color2: darkMode ? '#808080' : '#F5FCFF',
        color3: darkMode ? '#f4a460' : '#FF9E24',
        color4: darkMode ? '#00ffff' : '#333333',
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
    }

    componentWillUnmount() {
        this._isMounted = false;
   }

    //Switch Handlers
    _handleToggleSwitch = () => {
        var val = !this.state.switchValue;
        AsyncStorage.setItem('darkMode', `${val}`);
        if(this._isMounted) {
            this.setState({ switchValue: val })
            this.reset();
        }
    }

    _handleToggleSwitch2 = () => {
        if(this._isMounted) {
            this.setState({ switchValue2: !this.state.switchValue2 });
        }
    }

    // About button handler
    _onPress() {
        Alert.alert('Contributors: \n Connor Vincent\n W0646304@selu.edu\n\nKaleb Champagne\n kaleb.champagne@selu.edu \n\nAndrew Sievers \n andrew.sievers@selu.edu\n\n Brandon Lundy \n brandon.lundy@selu.edu');
    }

    reset() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Settings', params: {}, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    static navigationOptions = {
        title: 'Settings',
        headerLeft: null,
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
            backgroundColor: '#99ccff'
        },
        gesturesEnabled: false,
    };


    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={{
                flex: 1,
                backgroundColor: this.state.color1,
            }}>

                {/* Toggle Dark Theme */}
                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 25, color: this.state.color4 }}>
                        Toggle Dark Theme
                    </Text>
                    <Switch
                        onValueChange={this._handleToggleSwitch}
                        value={this.state.switchValue}
                    />
                </View>


                {/* Button for push notifications */}
                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 25, color: this.state.color4 }}>
                        Receive Notifications
                </Text>
                    <Switch
                        onValueChange={this._handleToggleSwitch2}
                        value={this.state.switchValue2}
                    />
                </View>

                <View style={this.styles.buttonContainer}>
                    <TouchableOpacity style={{ backgroundColor: this.state.color, flex: 1, alignItems: 'center', justifyContent: 'center', }} onPress={() => this._onPress() }>
                        <Text style={{ fontWeight: 'bold', color: this.state.color2, fontSize: screenHeight*0.035, textAlign: 'center' }} >
                            About Team B.A.C.K
                        </Text>
                    </TouchableOpacity>
                </View>

               {/* Nav bar */}
                <View style={this.styles.buttonLayout}>

            <View style={this.styles.aMenu}>
                <View style={this.styles.bMenu}>
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Inventory', params: {}, })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                        <Image source={require('./Assets/clipboard.png')} style={this.styles.mButtons} />
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
                                        NavigationActions.navigate({ routeName: 'Planner', params: { item: "" } })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                        <Image source={require('./Assets/calendar.png')} style={this.styles.mButtons} />
                    </TouchableOpacity>
                </View>
                <View style={this.styles.bMenu}>
                    <TouchableOpacity>
                        <Image source={require('./Assets/aSettings.png')} style={this.styles.mButtons} />
                    </TouchableOpacity>
                </View>
            </View>
                </View>
                </View>
        );
    }
    styles = StyleSheet.create({

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
    
        buttonContainer: {
        height: screenHeight*0.10,
        width: screenWidth,
        borderRadius: 4,
        padding: 1,
        marginTop: 25,
        shadowColor: this.state.color3,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 10,
        shadowOpacity: 0.25
        }
    });
}
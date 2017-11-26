import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions, Alert,
    AppRegistry, TouchableHighlight, FlatList, AsyncStorage,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { List, ListItem} from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Constants, } from 'expo';

var darkMode;
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class FavoritesScreen extends React.Component {
    
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
        data: [],
        color: darkMode ? '#99ccff' : '#99ccff',
        color1: darkMode ? '#808080': '#e6eeff' ,
        color3: darkMode ? '#f4a460' : '#FF9E24',
        color4: darkMode ? '#99ccff' : '#808080',
        color5: darkMode ? '#00ffff' : '#333333'
    };

    componentDidMount() {
        this._isMounted = true;
        AsyncStorage.getItem('darkMode', (err, result) => {
            if((this.state.color1 == '#808080' && result == 'false') || (this.state.color1 == '#e6eeff' && result == 'true'))
                if(this._isMounted)
                    this.reset(this.props.navigation.state.params.input)
        })
        AsyncStorage.getItem('favorites', (err, result) => {
            if(this._isMounted)
                this.setState({ data: JSON.parse(result) });
        })
    
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reset(input) {
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Recipes', params: {input}, }),
                NavigationActions.navigate({ routeName: 'Favorites', params: {input}, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    static navigationOptions = {
        title: 'Favorites',
        headerStyle: { paddingTop: Constants.statusBarHeight, height: 60 + Constants.statusBarHeight, backgroundColor: '#99ccff' },
        gesturesEnabled: false,
    };   
    
    delete = (item, index) => {
        var copy = this.state.data;
        copy.splice(index, 1);
        if(this._isMounted)
            this.setState({ data: copy })
        AsyncStorage.setItem('favorites', JSON.stringify(copy));
    }
    
    onItemPress = (navigate, item) => {
        if (!this.props.navigation.state.params.redirectToPlanner) {
            navigate('Get', { source_url: item.source_url })
        }
        else {
            AsyncStorage.getItem(`${this.props.navigation.state.params.redirectToPlanner}`, (err, result) => {
                if(result) {
                    AsyncStorage.setItem(`${this.props.navigation.state.params.redirectToPlanner}`, JSON.stringify(JSON.parse(result).concat(item)));
                }
                else 
                {
                    AsyncStorage.setItem(`${this.props.navigation.state.params.redirectToPlanner}`, JSON.stringify([item]));
                }
            })
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Planner', params: {item: `${this.props.navigation.state.params.redirectToPlanner}`}, })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }
    
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: this.state.color1, width: (screenWidth), }}>
                <List containerStyle={{ marginTop: 0, backgroundColor: this.state.color1 }}>
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={(x, i) => i}
                        renderItem={({ item, index }) => {
                            var swipeoutBtns = [{
                                text: 'Delete',
                                backgroundColor: this.state.color,
                                underlayColor: this.state.color3,
                                onPress: () => { this.delete(item, index) }
                            }];
                            return (
                                <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor='transparent'>
                                    <TouchableHighlight onPress={() => this.onItemPress(navigate, item)} underlayColor='#ffb366'>
                                        <View>
                                            <ListItem
                                                roundAvatar
                                                avatar={{ uri: item.image_url }}
                                                titleStyle={{ color: this.state.color5 }}
                                                title={item.title}
                                                subtitle={item.publisher}
                                                subtitleStyle={{ color: this.state.color4 }}
                                                hideChevron={true}
                                            />
                                        </View>
                                    </TouchableHighlight>
                                </Swipeout>
                            )
                        }}
                    />
                </List>
            </View>
        );
    }
}    
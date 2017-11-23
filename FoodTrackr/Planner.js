import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, TouchableHighlight, AsyncStorage, ScrollView
} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import { Constants, } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

var darkMode;
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var daySelected = '';

export default class RecipesScreen extends React.Component {
    
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
        color2: darkMode ? '#808080' : '#F5FCFF',
        color3: darkMode ? '#f4a460' : '#FF9E24',
        color4: darkMode ? '#99ccff' : '#808080',
        color5: darkMode ? '#00ffff' : '#333333'
    }

    componentDidMount() {
        this._isMounted = true;
        AsyncStorage.getItem('darkMode', (err, result) => {
            if((this.state.color1 == '#808080' && result == 'false') || (this.state.color1 == '#e6eeff' && result == 'true'))
                if(this._isMounted)
                    this.reset(this.props.navigation.state.params.item)
        })
        var date = '';
        if (!this.props.navigation.state.params.item) {
            var today = new Date();
            date = today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" + today.getDate();
        }
        else
        {
            date = this.props.navigation.state.params.item;
        }
        daySelected = date;
        if(this._isMounted) {
            this.setState({ selected: date });
        }
        setTimeout(() => {
            this.fetchData(date);
        }, 1000); 
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reset(item) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Planner', params: {item}, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    componentWillUpdate(prevProps, prevState) {
        if (!this.state.loading) {
            if(this._isMounted) {
                this.setState({ loading: true });
            }
        }
    }    

    componentDidUpdate(prevProps, prevState) {
        if (this.state.loading) {
            if(this._isMounted) {
                this.setState({ loading: false });
            }
        }
    }    

    static navigationOptions = {
        title: 'Planner',
        headerLeft: null,
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
            backgroundColor: '#99ccff'
        },
        gesturesEnabled: false,
    };    

    onDayPress = (day) => {
        if(this._isMounted) {
            this.setState({ selected: day.dateString })
        }
		this.fetchData(day.dateString);
        daySelected = day.dateString;
    }

	_onPress() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Recipes', params: { redirectToPlanner: `${daySelected}` } })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }
    
	onItemPress = (navigate, item) => {
		navigate('Get', { source_url: item.source_url })
    }

    delete = (item, index) => {
        var copy = this.state.data;
        copy.splice(index, 1);
        if(this._isMounted) {
            this.setState({ data: copy })
        }
        AsyncStorage.setItem(`${daySelected}`, JSON.stringify(copy));
        this.fetchData(daySelected);
    }

    fetchData(day) {
        AsyncStorage.getItem(`${day}`, (err, result) => {
            if(result && result != '[]') {
                if(this._isMounted) {
                    this.setState({ data: JSON.parse(result) })
                }
            }
            else 
            {
                if(this._isMounted) {
                    this.setState({ data: [{"publisher": "No recipes on this day", "title": "Empty Date", "source_url": "https://maxcdn.icons8.com/Share/icon/win10/Science//empty_set1600.png", "image_url": "https://maxcdn.icons8.com/Share/icon/win10/Science//empty_set1600.png"}] })
                }
            }
        })
    }

    render() {
		const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: this.state.color1 }}>
				<ScrollView style={{ flex: 1 }}>
					<Calendar
						onDayPress={this.onDayPress}
						style={this.styles.calendar}
						hideExtraDays
                        markedDates={{[this.state.selected]: {selected: true}}}
                        theme={{
                            calendarBackground: this.state.color1,
                            dayTextColor: this.state.color5,
                            monthTextColor: this.state.color5,
                            arrowColor: this.state.color5,
                            selectedDayBackgroundColor: this.state.color4,
                        }}
					/>
				</ScrollView>
				<View style={{ flex: 0.75 }}>
					  <List containerStyle={{ marginTop: 0, backgroundColor: this.state.color1 }}>
						<FlatList
							data={this.state.data}
							extraData={this.state.data}
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
				<View style={{ height: screenHeight * 0.05, width: screenWidth }}>
					<TouchableOpacity style={this.styles.addRecipe} onPress={() => this._onPress() }>
						<Text style={{ color: 'black', fontSize: 15, textAlign: 'center' }} >
							Add Recipe
						</Text>
                    </TouchableOpacity>
				</View>
                <View style={{ backgroundColor: this.state.color1, alignItems: 'flex-start', }}>
                    <View style={{ width: screenWidth, height: screenHeight * 0.10, flexDirection: 'row', backgroundColor: this.state.color2, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
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
                                        NavigationActions.navigate({ routeName: 'Recipes', params: {} })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                                    <Image source={require('./Assets/book.png')} style={this.styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                        <View style={this.styles.bMenu}>
                            <TouchableOpacity>
                                    <Image source={require('./Assets/aCalendar.png')} style={this.styles.mButtons} />
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
        item: {
            backgroundColor: this.state.color1,
            flex: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginTop: 17
        },
        addRecipe: {
            backgroundColor: this.state.color,
            flex: 1,
            alignItems: 'center', 
            justifyContent: 'center',
        },
        emptyDate: {
            height: 15,
            flex:1,
            paddingTop: 30
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
    });                
}
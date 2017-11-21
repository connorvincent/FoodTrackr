import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, Image, AsyncStorage,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { Constants, } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class PlannerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        items: {}, data: []
        };
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    //markingType={'interactive'}
                    //markedDates={{
                    //  '2017-05-08': [{textColor: '#666'}],
                    //  '2017-05-09': [{textColor: '#666'}],
                    //  '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
                    //  '2017-05-21': [{startingDay: true, color: 'blue'}],
                    //  '2017-05-22': [{endingDay: true, color: 'gray'}],
                    //  '2017-05-24': [{startingDay: true, color: 'gray'}],
                    //  '2017-05-25': [{color: 'gray'}],
                    //  '2017-05-26': [{endingDay: true, color: 'gray'}]}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
                <View style={{ backgroundColor: '#e6eeff', alignItems: 'flex-start', }}>
                    <View style={{ width: screenWidth, height: screenHeight * 0.10, flexDirection: 'row', backgroundColor: '#F5FCFF', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                        <View style={styles.bMenu}>
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Inventory', params: {}, })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                                    <Image source={require('./Assets/clipboard.png')} style={styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bMenu}>
                            <TouchableOpacity onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Recipes', params: {} })
                                    ]
                                });

                                this.props.navigation.dispatch(resetAction);
                            }}>
                                    <Image source={require('./Assets/book.png')} style={styles.mButtons} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bMenu}>
                            <TouchableOpacity>
                                    <Image source={require('./Assets/aCalendar.png')} style={styles.mButtons} />
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

    _onPress(navigate) {
        navigate('Recipes', { redirectToPlanner: `${true}` });
    }

    loadItems(day) {
        const { navigate } = this.props.navigation;
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                const numItems = Math.floor(Math.random() * 5);
                for (let j = 0; j < numItems; j++) {
                    this.state.items[strTime].push({
                    name: 'Item for ' + strTime,
                    height: Math.max(50, 50),
                    });
                }
            }
        }
        //console.log(this.state.items);
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
            items: newItems
        });
        }, 1000);
        //console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item, day) {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
                <View style={styles.buttonContainer}>
                    <Button onPress={() => this._onPress(navigate)} title="Add Recipe" color="#000000" accessibilityLabel="Tap on Me"/>
                </View>
            </View>
        );
    }

    renderEmptyDate() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
                    <Button onPress={() => this._onPress(navigate)} title="Add Recipe" color="#000000" accessibilityLabel="Tap on Me"/>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    buttonContainer: {
        backgroundColor: '#99ccff',
        borderRadius: 4,
        padding: 1,
        shadowColor: '#FF9E24',
    shadowOffset: {
            width: 0,
            height: 1
        }
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
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
});
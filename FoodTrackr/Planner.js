import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, Alert, ScrollView
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import { StackNavigator } from 'react-navigation';
import { Constants,} from 'expo';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class PlannerScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		items: {}
		};
		
	}
    static navigationOptions = {
        title: 'Planner',
        headerLeft: null,
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
            backgroundColor: '#99ccff'
        },
    };


    render() {
		
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
					<Agenda
						items={this.state.items}
						//loadItemsForMonth={this.loadItems.bind(this)}
						markedDates={{[this.state.selected]: {selected: true}}}
						//renderItem={this.renderItem.bind(this)}
						//renderEmptyDate={this.renderEmptyDate.bind(this)}
						//rowHasChanged={this.rowHasChanged.bind(this)}
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
                <View style={styles.aMenu}>
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
                            <Image source={require('./Assets/aCalendar.png')} style={styles.mButtons} />
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
  function loadItems(day) {
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
              height: Math.max(50, Math.floor(Math.random() * 150))
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
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  function renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  function renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  function rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }


const styles = StyleSheet.create({

    top: {
        flex: 1,
        backgroundColor: '#e6eeff',
        alignItems: 'flex-start',
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
    
	calendar: {
		borderTopWidth: 1,
		paddingTop: 0,
		borderBottomWidth: 1,
		borderColor: '#eee',
        height: screenHeight- (60+ Constants.statusBarHeight) - (screenHeight*.10),
        width: screenWidth
	},
	text: {
		textAlign: 'center',
		borderColor: '#bbb',
		padding: 10,
		backgroundColor: '#eee'
	},
	container: {
		flex: 1,
		backgroundColor: 'gray',
		height: screenHeight- (60+ Constants.statusBarHeight) - (screenHeight*.10),
        width: screenWidth
	},
	item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 60,
    flex:1,
    paddingTop: 30
}

});
import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, Alert, ScrollView,
	Button, Switch, StatusBar
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { StackNavigator } from 'react-navigation';
import { Constants,} from 'expo';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class PlannerScreen extends React.Component {
	constructor(props) {
		super(props);
		this.loadItems = this.loadItems.bind(this)
		this.renderItem = this.loadItems.bind(this)
		this.renderEmptyDate=this.renderEmptyDate.bind(this)
		this.rowHasChanged=this.rowHasChanged.bind(this)

		this.state = {
		items: {}
		};
    }
	_onPress() {
        Alert.alert('This button will allow you to add recipes to your Planner');
		
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

	loadItems(day) {
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
      
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }
   renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

 renderEmptyDate() {
    return (
	<View>
        <Table>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
    </View>
    );
  }

rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split(" ")[0];
  }
    render() {
		
        const { navigate } = this.props.navigation;
		const tableHead = ['Breakfast', 'Lunch', ' Supper'];
		const tableData = [
      ['1', '2', '3', '4'],
	  ]
        return (

            <View style={styles.container}>
					<Agenda
						items={{}}
						loadItemsForMonth={this.loadItems}
						markedDates={{[this.state.selected]: {selected: true}}}
						renderItem={this.renderItem}
						renderEmptyDate={this.renderEmptyDate}
						rowHasChanged={this.rowHasChanged}
						markingType={'interactive'}
						theme={{calendarBackground: 'white', agendaTodayColor: '#e6eeff', agendaKnobColor: '#99ccff'}}
						renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
						
						

					/>
					<View style={styles.buttonContainer}>
						<Button onPress={this._onPress} title="Add Recipe" color="#000000" accessibilityLabel="Tap on Me"/>
					</View>
                <View style={styles.aMenu}>
                    <View style={styles.bMenu}>
                        <TouchableOpacity onPress={() => navigate('Inventory')}>
                            <Image source={require('./Assets/clipboard.png')} style={styles.mButtons} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bMenu}>
                        <TouchableOpacity onPress={() => navigate('Recipes', { input: "" })}>
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
    backgroundColor: 'black',
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
	},
	 buttonContainer: {
    backgroundColor: '#99ccff',
    borderRadius: 4,
    padding: 1,
    shadowColor: '#FF9E24',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5 },
  row: { height: 30 }

});
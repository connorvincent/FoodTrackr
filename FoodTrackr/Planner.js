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
		this.state = {};
		
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
            <View style={styles.top}>
				<ScrollView style={styles.calendar}>
					<Calendar
					    onDayPress={this.onDayPress}
						style={styles.calendar}
						hideExtraDays
						markedDates={{[this.state.selected]: {selected: true}}}
					/>
				</ScrollView>
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
function onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
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
        height: screenHeight - (60 + Constants.statusBarHeight) - (screenHeight*.10),
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
		backgroundColor: 'gray'
	}

});
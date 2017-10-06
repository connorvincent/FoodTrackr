import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions,
    TouchableOpacity, AppRegistry, Alert, ScrollView, Calendar, CalendarList, Agenda
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants,} from 'expo';
import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['fr'] = {
	monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
	monthNamesShort: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],
	dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	dayNamesShort: ['Sun.','Mon.','Tue.','Wed.','Thurs.','Fri.','Sat.']
};
 
LocaleConfig.defaultLocale = 'fr';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class PlannerScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onDayPress = this.onDayPress.bind(this);
	}
    static navigationOptions = {
        title: 'Planner',
        headerLeft: null,
        headerStyle: {
            paddingTop: Constants.statusBarHeight,
            height: 60 + Constants.statusBarHeight,
        },
    };


    render() {
		
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.top}>
                <View>
					<div>
					<Calendar
						current = {'2017-10-01'}
						minDate = {'2017-10-01'}
						maxDate = {'2021-10-01'}
						onDayPress ={(day) => {console.log('selected day', day)}}
						monthFormat={'yyyy MM'}
						onMonthChange ={ (month) => {console.log('month changed', month)}}
						hideArrows = {true}
						renderArrow = {(direction) => (<Arrow />)}
						hideExtraDays = {true}
						disableMonthChange = {true}
						firstDay = {1}
						/>
					<Calendar
						markedDates = {{}}
					/>
					<Calendar 
						 style={{
							borderWidth: 1,
							borderColor: 'gray',
							height: 350
						}}
						theme={{
						 calendarBackground: '#ffffff',
						 textSectionTitleColor: '#b6c1cd',
						 selectedDayBackgroundColor: '#00adf5',
						 selectedDayTextColor: '#ffffff',
						 todayTextColor: '#00adf5',
						 dayTextColor: '#2d4150',
							textDisabledColor: '#d9e1e8',
							dotColor: '#00adf5',
							selectedDotColor: '#ffffff',
							arrowColor: 'orange',
							monthTextColor: 'blue'
						}}
						/>
					</div>
                </View>
                <View style={styles.bMenu}>
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
                            <Image source={require('./Assets/calendar.png')} style={styles.aButton} />
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
        backgroundColor: '#F5FCFF',
        alignItems: 'flex-start',
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
        height: screenHeight * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9E24',
    },
    aButton: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D3D3D3',
    },

});
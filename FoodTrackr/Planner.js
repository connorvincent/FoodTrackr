import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, Image, FlatList, TouchableHighlight, AsyncStorage
} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import { Constants, } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var daySelected = '';

export default class PlannerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
			data: []
		};
		this.onDayPress = this.onDayPress.bind(this);
    }


	componentDidMount() {
	}

	

    render() {
		const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, }}>
				<View style={{ flex: 0.6, }}>
					<Calendar
						onDayPress={this.onDayPress}
						style={styles.calendar}
						hideExtraDays
						markedDates={{[this.state.selected]: {selected: true}}}
					/>
				</View>
				<View style={{ flex: 0.35, }}>
					  <List containerStyle={{ marginTop: 0 }}>
						<FlatList
							data={this.state.data}
							extraData={this.state}
							keyExtractor={(x, i) => i}
							renderItem={({ item, index }) => (
								<TouchableHighlight onPress={() => this.onItemPress(navigate, item)} underlayColor='#ffb366'>
											 <View>
												 <ListItem
													roundAvatar
													avatar={{ uri: item.image_url }}
													title={item.title}
													subtitle={item.publisher}
												 />
											 </View>
									</TouchableHighlight>
							)}     
						/>
					</List>
				</View>
				<View style={{ flex: 0.05, }}>
					<TouchableOpacity style={{ backgroundColor: '#99ccff', flex: 1, alignItems: 'center', justifyContent: 'center', }} onPress={() => this._onPress(navigate) }>
						<Text style={{ color: 'black', fontSize: 15, textAlign: 'center' }} >
							Add Recipe
						</Text>
                    </TouchableOpacity>
				</View>
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
	onDayPress = (day) => {
		this.setState({ selected: day.dateString })
		setTimeout(() => {
			AsyncStorage.getItem(`${day.dateString}`, (err, result) => {
				if(result) {
					this.setState({ data: JSON.parse(result) })
				}
				else 
				{
					this.setState({ data: [{"publisher": "No recipes on this day", "title": "Empty Date", "source_url": "https://maxcdn.icons8.com/Share/icon/win10/Science//empty_set1600.png", "image_url": "https://maxcdn.icons8.com/Share/icon/win10/Science//empty_set1600.png"}] })
				}
			})
		}, 1000);
		this.daySelected = day.dateString;
		console.log(day.dateString);
	}
	_onPress(navigate) {
		navigate('Recipes', { redirectToPlanner: `${daySelected}` });
	}
	onItemPress = (navigate, item) => {
		navigate('Get', { source_url: item.source_url })
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
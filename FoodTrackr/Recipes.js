import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions, Alert,
    TouchableHighlight, AppRegistry, TouchableOpacity,
    FlatList, TextInput, Keyboard, ActivityIndicator, AsyncStorage,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { List, ListItem } from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Constants, } from 'expo';
import EasterEgg from './EasterEgg';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var page = 1;
var easteregg = false;
var prevInput = '';
var endReached = false;

export default class RecipesScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Recipes',
        headerLeft: (
            <View style={{ height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => navigation.state.params.redirectToPlanner ? navigation.navigate('Favorites', { redirectToPlanner: `${true}` }) : navigation.navigate('Favorites', { redirectToPlanner: "" })}>
                    <View>
                        <Image source={require('./Assets/favorite.png')} style={{height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff',}} />
                    </View>
                </TouchableOpacity>
            </View>
        ),
        headerRight: <Text style={{ color: '#0000ff', fontSize: 10, }}>Powered By Food2Fork.com</Text>,
        headerStyle: { paddingTop: Constants.statusBarHeight, height: 60 + Constants.statusBarHeight, backgroundColor: '#99ccff' },
        gesturesEnabled: false,
    });

    state = {
        text: '',
        data: [],
        loading: false,
    };

    componentDidMount() {
        this.prevInput = this.state.text;
        this.search();
        if (this.props.navigation.state.params.input) {
            this.setState({ text: this.props.navigation.state.params.input });
        }
    }

    componentWillUpdate(prevProps, prevState) {
        if (!this.state.loading) {
            this.setState({ loading: true });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
    }

    preSearch = () => {
        var input = this.state.text;
        if ( input.match(/[^A-Za-z, ]/) ) {
            Keyboard.dismiss();
            Alert.alert( 'Invalid Data', 'Only letters, spaces, and commas are allowed.' );
        }
        else if(this.prevInput == input)  {
            Keyboard.dismiss();
        }
        else {
            this.prevInput = input;
            this.search();
        }
    };

    search = () => {
        this.endReached= false;
        page = 1;
        this.setState({ data: [], });
        this.fetchData();
    };

    fetchData = () => {
        Keyboard.dismiss()
        //easter egg
        if(EasterEgg.isEggs(this.state.text)) {
            easteregg = true;
            this.setState({ data: EasterEgg.getEggs(this.state.text) });
        }
        else {
            easteregg = false; //end easter egg
            var myRequest = `http://food2fork.com/api/search?key=c6bd8277327971ad694a7aed81d28e18&q=${this.state.text}&page=${page}`;
            fetch(myRequest).then(results => results.json()).then(results => {
                if(JSON.stringify(results.recipes) != '[]') {
                    this.setState({ data: this.state.data.concat(results.recipes) });
                    this.endReached = false;
                    if(results.recipes.length%30 != 0)
                        this.fetchEnd();
                }
                else
                this.fetchEnd();
            });
        }
    }

    waited = true;
    handleEnd = () => {
        if(!this.state.loading && !this.endReached) {
            if(this.waited) {
                page = page + 1;
                this.setState(state => ({ loading: true }), () => this.fetchData());
                this.waited=false;
                setTimeout( () => {this.waited = true}, 3000)
            }
            else
            setTimeout( () => {this.waited = true}, 3000)
        }
    };

    fetchEnd() {
        this.endReached = true;
        easteregg = true;
        var endData = {"title": "No more data", "publisher": "End of page reached", 
        "source_url": "http://food2fork.com/about/api", "recipe_id": "end", 
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Australian_road_sign_-_dead_end.svg/2000px-Australian_road_sign_-_dead_end.svg.png"};
        this.setState({ loading: false, data: this.state.data.concat(endData) });
    }

    favorite = (item, index) => {
        AsyncStorage.getItem('favorites', (err, result) => {
            if(result.startsWith('[{')) {
                AsyncStorage.setItem('favorites', JSON.stringify(JSON.parse(result).concat(item)));
            }
            else
            {
                AsyncStorage.setItem('favorites', JSON.stringify([].concat(item)));
            }
        })
    }

    onItemPress = (navigate, item) => {
        if (!this.props.navigation.state.params.redirectToPlanner) {
            navigate('Get', { source_url: item.source_url })
        }
        else {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Planner', params: {item: `${JSON.stringify(item)}`}, })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: '#e6eeff', alignItems: 'flex-start', }}>
                <View style={{height: (screenWidth * 0.17) - Constants.statusBarHeight, flexDirection: 'row', }}>
                    <TextInput style={{ height: (screenWidth * 0.10), width: screenWidth, }}
                        placeholder="Search Recipes..."
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        onSubmitEditing={this.preSearch}
                    />
                </View>
                <View style={{ flex: 1, width: (screenWidth), }}>
                    <List containerStyle={{ marginTop: 0 }}>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state}
                            keyExtractor={item => item.recipe_id}
                            onEndReached={this.state.loading ? null : () => this.handleEnd()}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={() => (this.state.loading || easteregg) ? null : <ActivityIndicator color='#FF9E24' size='large' animating />}
                            renderItem={({ item, index }) => 
                                {
                                    var swipeoutBtns = [{
                                        text: 'Favorite',
                                        backgroundColor: '#99ccff',
                                        underlayColor: '#FF9E24',
                                        onPress: () => { this.favorite(item, index) }
                                    }];
                                    return (
                                        <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor='transparent'>
                                            <TouchableHighlight onPress={() => this.onItemPress(navigate, item)} underlayColor='#ffb366'>
                                                <View>
                                                    <ListItem
                                                        roundAvatar
                                                        avatar={{ uri: item.image_url }}
                                                        title={item.title}
                                                        subtitle={item.publisher}
                                                        hideChevron={true}
                                                    />
                                                </View>
                                            </TouchableHighlight>
                                        </Swipeout>
                                    )
                                }
                            }
                        />
                    </List>
                </View>
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
                        <TouchableOpacity>
                                <Image source={require('./Assets/aBook.png')} style={styles.mButtons} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bMenu}>
                        <TouchableOpacity onPress={() => {
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'Planner', params: { item: "" } })
                                ]
                            });

                            this.props.navigation.dispatch(resetAction);
                        }}>
                                <Image source={require('./Assets/calendar.png')} style={styles.mButtons} />
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
        );
    }
}

const styles = StyleSheet.create({

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
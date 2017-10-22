import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions, Alert,
    TouchableHighlight, AppRegistry, TouchableOpacity,
    FlatList, TextInput, Keyboard, ActivityIndicator, AsyncStorage,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { List, ListItem} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Constants, } from 'expo';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var page = 1;
var easteregg = false;
var prevInput = '';
var endReached = false;

export default class RecipesScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Recipes',
        headerLeft: (
            <View style={{ height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff', justifyContent: 'center', alignItems: 'center',}}>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                    <View>
                        <Image source={require('./Assets/favorite.png')} style={{height: screenWidth * 0.10, width: screenWidth * 0.10, backgroundColor: '#99ccff',}} />
                    </View>
                </TouchableOpacity>
            </View>
        ),
        headerRight: <Text style={{ color: '#0000ff', fontSize: 10, }}>Powered By Food2Fork.com</Text>,
        headerStyle: { paddingTop: Constants.statusBarHeight, height: 60 + Constants.statusBarHeight, backgroundColor: '#99ccff' },
    });

    state = {
        text: '',
        data: [],
        loading: false,
    };

    componentDidMount() {
        this.prevInput = this.state.text;
        this.search();
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
        if (this.state.text == "SELU CMPS" || this.state.text == "CMPS SELU" || this.state.text == "cmps selu" || this.state.text == "selu cmps") {
            easteregg = true;
                this.setState({
                    data: [{ "publisher": "(985) 549-5099", "title": "Ghassan Alkadi", "recipe_id": "GhassanAlkadi", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/ghassan.jpg", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/ghassan.jpg" },
                    { "publisher": "(985) 549-2189", "title": "Lu Yuan", "recipe_id": "LuYuan", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/luweb.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/luweb.jpg" },
                    { "publisher": "(985) 549-5314", "title": "John Burris", "recipe_id": "JohnBurris", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/burris_web.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/burris_web.jpg" },
                    { "publisher": "(985) 549-2314", "title": "Mike Asoodeh", "recipe_id": "MikeAsoodeh", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/assodeh2.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/assodeh2.jpg" },
                    { "publisher": "(985) 549-5315", "title": "Cris Koutsougeras", "recipe_id": "CrisKoutsougeras", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/crisweb.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/crisweb.jpg" },
                    { "publisher": "(985) 549-5506", "title": "Patrick McDowell", "recipe_id": "PatrickMcDowell", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/mcdowell.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/mcdowell.jpg" },
                    { "publisher": "(985) 549-5505", "title": "Steele Russell", "recipe_id": "Steele Russell", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/steeleweb.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/steeleweb.jpg" },
                    { "publisher": "(985) 549-5105", "title": "Allanagh Sewell", "recipe_id": "AllanaghSewell", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/sewell1.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/sewell1.jpg" },
                    { "publisher": "(985) 549-3769", "title": "Omer M. Soysal", "recipe_id": "OmerMSoysal", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/omer.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/omer.jpg" },
                    { "publisher": "(985) 549-5088", "title": "Kuo-Pao Yang", "recipe_id": "Kuo-PaoYang", 
                    "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/paoweb.jpg", 
                    "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/paoweb.jpg" }]
                });
            }
        else if (this.state.text == "tutors" || this.state.text == "Tutors" || this.state.text == "tutor" || this.state.text == "Tutor") {
            easteregg = true;
                this.setState({
                    data: [
                        { "publisher": "This is Joshua Wetzel", "title": "Joshua Wetzel", "recipe_id": "JoshuaWetzel", "image_url": 
                        "https://scontent.fbtr1-1.fna.fbcdn.net/v/t1.0-0/p110x80/10577110_707219412660765_636685016534560017_n.jpg?oh=cd6d57cb62c84c6d3d0a7775e8f4050c&oe=5A7B1627", 
                        "source_url": 
                        "https://scontent.fbtr1-1.fna.fbcdn.net/v/t1.0-0/p110x80/10577110_707219412660765_636685016534560017_n.jpg?oh=cd6d57cb62c84c6d3d0a7775e8f4050c&oe=5A7B1627" },
                        { "publisher": "Definitely not him", "title": "Not Joshua Wetzel", "recipe_id": "notJoshuaWetzel", "image_url": 
                        "https://scontent.fbtr1-1.fna.fbcdn.net/v/t1.0-0/p110x80/10577110_707219412660765_636685016534560017_n.jpg?oh=cd6d57cb62c84c6d3d0a7775e8f4050c&oe=5A7B1627", 
                        "source_url": 
                        "https://scontent.fbtr1-1.fna.fbcdn.net/v/t1.0-0/p110x80/10577110_707219412660765_636685016534560017_n.jpg?oh=cd6d57cb62c84c6d3d0a7775e8f4050c&oe=5A7B1627" },
                        { "publisher": "Awful, just awful", "title": "Cory Clapp", "recipe_id": "CoryClapp", "image_url": 
                        "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAeoAAAAJGYzYjM5MmMyLWY3NzYtNDg5ZC1iMzk5LTIzY2Q3Y2UwZWEwNg.jpg", 
                        "source_url": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAeoAAAAJGYzYjM5MmMyLWY3NzYtNDg5ZC1iMzk5LTIzY2Q3Y2UwZWEwNg.jpg" }]
                });
            }
        else if (this.state.text == "questions" || this.state.text == "?" || this.state.text == "questions?" || this.state.text == "Questions?" || this.state.text == "Questions") {
            easteregg = true;
                this.setState({
                    data: [{ "publisher": "I have a question", "title": "Cory Clapp", "recipe_id": "CoryClapp", 
                    "image_url": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAeoAAAAJGYzYjM5MmMyLWY3NzYtNDg5ZC1iMzk5LTIzY2Q3Y2UwZWEwNg.jpg", 
                    "source_url": "https://www.google.com/maps/search/gun+store+app/@30.3120449,-90.990093,11z/data=!3m1!4b1" }]
                });
            }
        else {
            easteregg = false; //end easter egg
            var myRequest = `http://food2fork.com/api/search?key=c6bd8277327971ad694a7aed81d28e18&q=${this.state.text}&page=${page}`;
                console.log(`fetch ${myRequest}`)
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
                                            <TouchableHighlight onPress={() => navigate('Get', { source_url: item.source_url })} underlayColor='#ffb366'>
                                                <View>
                                                    <ListItem
                                                        roundAvatar
                                                        avatar={{ uri: item.image_url }}
                                                        title={item.title}
                                                        subtitle={item.publisher}
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
                        <TouchableOpacity onPress={() => navigate('Inventory')} >
                            <View>
                                <Image source={require('./Assets/clipboard.png')} style={styles.mButtons} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bMenu}>
                        <TouchableOpacity>
                            <View>
                                <Image source={require('./Assets/aBook.png')} style={styles.mButtons} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bMenu}>
                        <TouchableOpacity onPress={() => navigate('Planner')}>
                            <View>
                                <Image source={require('./Assets/calendar.png')} style={styles.mButtons} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bMenu}>
                        <TouchableOpacity onPress={() => navigate('Settings')}>
                            <View>
                                <Image source={require('./Assets/settings.png')} style={styles.mButtons} />
                            </View>
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
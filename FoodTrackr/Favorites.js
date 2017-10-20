import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions, Alert,
    AppRegistry, TouchableHighlight, FlatList, AsyncStorage,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { List, ListItem} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Constants, } from 'expo';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
export default class FavoritesScreen extends React.Component {

    static navigationOptions = {
        title: 'Favorites',
        headerStyle: { paddingTop: Constants.statusBarHeight, height: 60 + Constants.statusBarHeight, backgroundColor: '#99ccff' },
    };

    state = {
        data: [],
    };

    componentDidMount() {
        AsyncStorage.getItem('favorites', (err, result) => {
           this.setState({ data: JSON.parse(result) });
        })
    }

    delete = (item, index) => {
        var copy = this.state.data;
        copy.splice(index, 1);
        this.setState({ data: copy })
            AsyncStorage.setItem('favorites', JSON.stringify(copy));
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: '#e6eeff', width: (screenWidth), }}>
                <List containerStyle={{ marginTop: 0 }}>
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={(x, i) => i}
                        renderItem={({ item, index }) => 
                                {
                                    var swipeoutBtns = [{
                                        text: 'Delete',
                                        backgroundColor: '#99ccff',
                                        underlayColor: '#FF9E24',
                                        onPress: () => { this.delete(item, index) }
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
        );
    }
}

const styles = StyleSheet.create({

});
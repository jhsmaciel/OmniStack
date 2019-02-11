import React, { Component } from 'react';
import api from '../services/api';
import { View, Text, StyleSheet } from 'react-native';

export default class Timeline extends Component {

    state = {
        tweets: [],
    };

    async componentDidMount() {
        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.tweets.map(tweet => (<Text>{tweets.author}</Text>))}
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
});
  
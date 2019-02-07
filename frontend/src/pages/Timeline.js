import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg';
import './Timeline.css';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {

    state = {
        tweets: [],
        newTweet: ""
    };

    subsclibeToEvents = () => {
        const io = socket('http://localhost:3000');

        io.on('tweet', data => {
            console.log(data);
            this.setState({ tweets: [data, ...this.state.tweets]});
        });

        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map(
                tweet => ( tweet._id === data._id ? data : tweet )
                )
            });
        });
    }

    handleInputChange = async e => {
        this.setState({ newTweet: e.target.value });
    }

    async componentDidMount(){
        this.subsclibeToEvents();
        const response = await api.get('tweets');

        this.setState({tweets: response.data, });
    }

    handleNewTweet = async e => {
        if (e.keyCode !== 13) return;

            const content = this.state.newTweet;
            const author = localStorage.getItem("@GoTwitter:userName");

            await api.post("tweets",{ author, content });

            this.setState({ newTweet: '' }); 
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img heigth={24} src={twitterLogo} alt="GoTwitter"></img>
                <form>
                    <textarea
                    value={this.state.newTweet}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleNewTweet}
                    placeholder="O que está acontecendo?" />
                </form> 
                <ul className="tweet-list">
                    { this.state.tweets.map( tweet => (
                        <Tweet key={tweet._id} tweet={tweet}></Tweet>
                    ))}
                </ul>
            </div> 
        );
    }
}
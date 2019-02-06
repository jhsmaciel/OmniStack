import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';
import like from "../like.svg";
import './Tweet.css';

export default class Tweet extends Component {

    handleLike = async ()  => {
        const { _id } = this.props.tweet;

        await api.post("likes/"+_id);
    }

    subsclibeToEvents = () => {
        const io = socket('http://localhost:3000');

        io.on('tweet', data => {
            console.log(data);
            this.setState({ tweets: [data, ...this.state.tweets]});
        });

        io.on('like', data => {
        });
    }

    render() {
    const { tweet } = this.props;

    return (
        <li className="tweet">
            <strong>{tweet.author}</strong>
            <p>{tweet.content}</p>
            <button type='button' onClick={this.handleLike}>
                <img src={like} alt='Like'/>
                {tweet.likes}
            </button>
        </li>
    );
    }
}

import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Timeline.css';

import api from '../services/api';


export default class Timeline extends Component {

    state = {
        newTweet: ""
    }

    handleNewTweet = async e => {
        if (e.keyCode == 13){
            const content = this.state.newTweet;
            const author = localStorage.getItem("@GoTwitter:userName");

            await api.post("tweets",{ author, content });

            this.setState({ newState: '' });    
        } else {
            return
        }
    }

    handleInputChange = e => {
        this.setState({ newTweet: e.target.value });
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
            </div> 
        );
    }
}

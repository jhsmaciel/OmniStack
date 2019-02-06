import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
    state = {
        userName: '', 
    };

    handleSubmit = (e) => {
        e.preventDefault();
        
        const { userName } = this.state;

        if (!userName.length) return;

        localStorage.setItem('@GoTwitter:userName', userName);

        this.props.history.push('/timeline');
    }

    handleInputChange = (e) => {
        this.setState({ userName: e.target.value });
    }

    render() {
        return (
            <div className="login-wrapper"> 
                <img src={twitterLogo} alt="GoTwitter" /> 
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.userName} onChange={this.handleInputChange} placeholder="Nome de usuário"/>
                    <input placeholder="Digite a sua senha" type="password"></input>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}

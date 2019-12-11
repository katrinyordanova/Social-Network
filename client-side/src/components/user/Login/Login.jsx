import React, { Component } from 'react';
import '../../shared-styles/UserForm/UserForm.css';
import loginValidator from '../../../utils/userValidations/loginValidator/loginValidator';
import { toast } from 'react-toastify';

class Login extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        if (loginValidator(username, password)) {
            this.setState({ isLogged : true });
            const data = {username, password};
            this.props.login(data, this.props.history).catch(error => {
                toast.error('Invalid username or password!');
                return;
            });
        }
    }

    render() {
        return <div className="Login">
            <div className="Header">
                <h1>Login</h1>
            </div>
            <form className="LoginForm">
                <div className="InputFields">
                    <div className="Username">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className="Password">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="FormButton">
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    }
}

export default Login;
import React, { Component } from 'react';

export class Login extends Component {
    state = {
        username: '',
        signUpName: '',      
        users: [],
        validUser: false    
    }
    
    
    componentDidMount () {
        return this.getUsers()
    }

    addUsers = (users) => {
        for (let index = 0; index < users.length; index++) {
            const user = users[index];            
        this.setState({
            users: [
                ...this.state.users, 
                {username: user.username,
                id: user.id}
            ]  
        })
    }
    }

    getUsers = () => {
        fetch(`http://localhost:3000/users`).then(response => response.json()).then(users => this.addUsers(users))
    }
    
    
    setUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    validatieUser = (event) => {
        event.preventDefault()
        if ([...this.state.users].find(name => name.username === this.state.username)) {
            this.setState({validUser: true})
        }else{alert('Username not found, please Sign Up!')
                this.setState({signUpName: this.state.username})}
                this.setState({username: ''})
    }

    
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={event => this.validatieUser(event)}>
                    <input type="text" onChange={event => this.setUsername(event)} value={this.state.username} />
                    <div><button type="submit">Submit</button></div>
                </form>
                <br></br>
                <form>
                    <h2>Sign Up</h2>
            <input type="text" onChange={event => this.setUsername(event)} value={this.state.signUpName} />
            <div>
            <button type="submit">Submit</button>
            </div>    
                </form>
            </div>
        );
    }
}

export default Login;

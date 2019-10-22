import React, { Component } from 'react';

export class Login extends Component {
    state = {
        username: '',
        signUpName: '',      
        users: [],
        validUser: false    
    }


    
    getUsers = () => {
        fetch(`http://localhost:3000/users`).then(response => response.json()).then(users => this.addUsers(users))
    }

    postUser = (event) => {
        event.preventDefault()
        let data = {username: this.state.signUpName}
        fetch(`http://localhost:3000/users/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
    }).then(response => response.json()).then(newUser => {
        this.addUsers([newUser])
        this.setState({
            username: newUser.username,
            signUpName: '',
            validUser: true
        })
    }).catch(alert('Username Already Taken'))
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

    
    
    setUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    setSignUpName = (event) => {
        this.setState({
            signUpName: event.target.value
        })
    }

    validatieUser = (event) => {
        event.preventDefault()
        if ([...this.state.users].find(name => name.username === this.state.username)) {
            this.setState({validUser: true
            })
         let  userId = [...this.state.users].find(name => name.username === this.state.username)

            this.props.getUser(userId)

        }else{alert('Username not found, please Sign Up!')
                this.setState({signUpName: this.state.username})}
                this.setState({username: ''})
                document.getElementById('signUpInput').focus()
    }

    
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={event => this.validatieUser(event)}>
                    <input id="logInInput" type="text" onChange={event => this.setUsername(event)} value={this.state.username} />
                    <div><button type="submit">Submit</button></div>
                </form>
                <br></br>
                <form onSubmit={event => this.postUser(event)}>
                    <h2>Sign Up</h2>
            <input id="signUpInput" type="text" onChange={event => this.setSignUpName(event)} value={this.state.signUpName} />
            <div>
            <button type="submit">Submit</button>
            </div>    
                </form>
            </div>
        );
    }
}

export default Login;

import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import FreeDates from './components/FreeDates'
import Matches from './components/Matches'
import Favourites from './components/Favourites'



class App extends Component {

state = {
  user: ''
}


componentDidMount () {
}

getUser = (user) => {
    this.setState({
      user
    })
}



render () {
  return (
    <div className="App">
      <header className="App-header">
       <div>Hello! Dev Test</div>
       <Login getUser={this.getUser}/>
       <FreeDates />
       <Favourites />
       <Matches />
      </header>
    </div>
  );
}
}

export default App;

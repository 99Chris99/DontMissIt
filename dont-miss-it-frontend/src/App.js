import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import FreeDates from './components/FreeDates'
import Matches from './components/Matches'
import Favourites from './components/Favourites'



class App extends Component {

state = {
  user: {id: 4},
  selectedDates: []
}


getUser = (user) => {
    this.setState({
      user
    })
}

getSelectedDates = (newDates) => {
  this.setState({
    selectedDates: newDates
  })
}


//////////////////////// Free Dates /////////////////




////////////////////// Free Dates End /////////////////


render () {
  return (
    <div className="App">
      <header className="App-header">
       <div>Hello! Dev Test</div>
       <Login getUser={this.getUser}/>
       <FreeDates getSelectedDates={this.getSelectedDates} userId={this.state.user}/>
       <Favourites userId={this.state.user.id}/>
       <Matches />
      </header>
    </div>
  );
}
}

export default App;

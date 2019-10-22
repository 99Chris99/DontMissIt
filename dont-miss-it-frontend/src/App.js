import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import FreeDates from './components/FreeDates'
import Matches from './components/Matches'
import Favourites from './components/Favourites'



class App extends Component {

state = {
  eventData: []
}


componentDidMount () {
  this.getTicketMaster()
}

getTicketMaster = () => {
return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=chelsea%20fc&apikey=2sQ195wxoeK8TTLpFxB8XPY5WHbaFyBm`).then(response => response.json()).then(data => this.setState({eventData: data}))
}

render () {
  return (
    <div className="App">
      <header className="App-header">
       <div>Hello! Dev Test</div>
       <Login />
       <FreeDates />
       <Matches />
       <Favourites />
      </header>
    </div>
  );
}
}

export default App;

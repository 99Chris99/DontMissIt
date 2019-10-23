import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import FreeDates from './components/FreeDates'
import Matches from './components/Matches'
import Favourites from './components/Favourites'



class App extends Component {

state = {
  user: {id: ''},
  selectedDates: [],
  favourites:[]
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

getFavourites = (newFavs) => {
  if (typeof newFavs !== 'undefined') {
  this.setState({
    favourites: newFavs
  })
}
}

mapDatesForProps = () => {
  if (typeof this.state.selectedDates !== 'undefined') {
 return this.state.selectedDates.map(datey => datey.date)
  }
}


render () {
  return (
    <div className="App">
      <header className="App-header">
       <div>Hello! Dev Test</div>
       {this.state.user.id === '' ? <Login getUser={this.getUser} /> : 
       <div>
       <FreeDates getSelectedDates={this.getSelectedDates} userId={this.state.user}/>
       <Favourites userId={this.state.user.id} getFavourites={this.getFavourites}/>
       <Matches dates={this.mapDatesForProps()} favourites={this.state.favourites}/>
       </div>}
      </header>
    </div>
  );
}
}

export default App;

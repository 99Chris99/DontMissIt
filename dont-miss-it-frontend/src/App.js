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
  if (this.state.selectedDates > 0) {
 return this.state.selectedDates.map(datey => datey.date)
  }
}


render () {
  return (
    

      <div class="app">
        
        <div class="ui top attached button" id="logo" role="button" tabindex="0"> Welcome to <i>Don't Miss It</i></div>
        <header className="App-header">
          <br></br>
          {/* <img className="logo" src={logo} /> */}
          <div class="ui card" id="card">
            <div class="content">
              <div class="header">
              <Login getUser={this.getUser}/>
              </div>
            </div>
            <div class="extra content"></div>
          </div>
          <table class="ui single line table" id="table">
            <thead class="">
              <tr class="">
                
                <th class="">
                  <div class="ui card" id="card">
                    <div class="content">
                      <div class="header">
                      <FreeDates getSelectedDates={this.getSelectedDates} userId={this.state.user}/>
                      </div>
                    </div>
                    <div class="extra content"></div>
                  </div>
                </th>
                <th></th>
                
                <th class="">
                  <div class="ui card" id="card">
                    <div class="content">
                      <div class="header">
                      <Favourites userId={this.state.user.id} getFavourites={this.getFavourites}/>
                      </div>
                    </div>
                    <div class="extra content"></div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
          <div class="ui card" id="card">
            <div class="content">
              <div class="header">
              <Matches dates={this.mapDatesForProps()} favourites={this.state.favourites}/>
              </div>
            </div>
            <div class="extra content"></div>
          </div>
        

        </header>
      </div>
  );
}
}

export default App;

import React, { Component } from "react"
import "./App.css"
import Login from "./components/Login"
import FreeDates from "./components/FreeDates"
import Favourites from "./components/Favourites"
import logo from "./logo.png"

class App extends Component {
  state = {
    eventData: []
  }

  componentDidMount() {
    this.getTicketMaster()
  }

  getTicketMaster = () => {
    return fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?keyword=chelsea%20fc&apikey=2sQ195wxoeK8TTLpFxB8XPY5WHbaFyBm`
    )
      .then(response => response.json())
      .then(data => this.setState({ eventData: data }))
  }

  render() {
    return (
      <div class="app">
        
        <div class="ui top attached button" id="logo" role="button" tabindex="0"> Welcome to <i>Don't Miss It</i></div>

        <header className="App-header">
          <br></br>
          {/* <img className="logo" src={logo} /> */}

          <div class="ui card" id="card">
            <div class="content">
              <div class="header">
                <Login />
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
                        <Favourites />
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
                        <FreeDates />
                      </div>
                    </div>
                    <div class="extra content"></div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>

        </header>
      </div>
    )
  }
}

export default App

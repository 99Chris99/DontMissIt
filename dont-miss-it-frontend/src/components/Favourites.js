import React, { Component } from "react"
import Login from "./Login"
import FavouritesList from "./FavouritesList"


class Favourites extends Component {
  state = {
    attractions: [],
    searchKeyword: "",
    submittedKeyword: "",
    favouriteAttractions: [],
    favouriteAttractionsFromServer: [],
    showFavouritesList: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.submittedKeyword !== prevState &&
      this.state.submittedKeyword !== ""
    ) {
      return this.getAttractions()
    }
  }

  getAttractions = () => {
    return fetch(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${this.state.submittedKeyword}&apikey=2sQ195wxoeK8TTLpFxB8XPY5WHbaFyBm`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          attractions:
            data.page.totalElements === 0
              ? window.location.reload(false) &
                alert("sorry this event does not exist")
              : data._embedded.attractions.map(attraction => attraction.name)
        })
      )
  }



  getFavouriteAttractions = () => {
    return fetch('http://localhost:3000/favourites')
      .then(response => response.json())
      .then(data => {
        this.setState({
          favouriteAttractionsFromServer: data.map(attraction => `${attraction.id}:${attraction.name}`)
          // favouriteAttractionsFromServer: [
          //   ...this.state.favouriteAttractionsFromServer,
            
          //     {attractionId: data.id,
          //     attractionName: data.name}
            
          // ]
            
          
        })
      }
      )
  }



  postAttraction = (event) => {
    
   let data = {
     user_id: 1,
     name: event.target.value
  }
     fetch('http://localhost:3000/favourites', {
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify(data)
    }).then(response => response.json()).then(this.setState({favouriteAttractions: [...this.state.favouriteAttractions, data.name]}))
    event.preventDefault()
  }

  searchKeywordHandler = event => {
    this.setState({ searchKeyword: event.target.value })
  }

  submittedKeywordHandler = event => {
    event.preventDefault()
    this.setState({ submittedKeyword: this.state.searchKeyword })
  }

  clearFavouritesFormInput = () => {
    document.getElementById("addFavourtiesForm").reset()
  }

  showFavouritesListHandler = () => {
    this.setState({showFavouritesList: !this.state.showFavouritesList})
  }

  showEventsOnClick = () => {
    this.getFavouriteAttractions()
    this.showFavouritesListHandler()
  }

  postEventOnClick = (event) => {
    this.postAttraction(event)
    alert('Event added to your favourites list')
  }

  destroy = (id) => {
    return fetch(`http://localhost:3000/favourites/${id}`, {
      method: 'DELETE'
    }).then(resp => resp.json()).then(data => {
      let newFavourites = this.state.favouriteAttractionsFromServer.filter(attraction => attraction.split(':')[0] != data.id )

      this.setState({favouriteAttractionsFromServer: newFavourites})
    })
  }

  render() {
    return (
      <div>
       <h3 class="ui header"> Add your favourite events </h3>
        <div>
          <form id="addFavourtiesForm" onSubmit={event => this.submittedKeywordHandler(event)}>
            
            <div class="ui icon input">
              <input type="text" onChange={event => {this.setState({ searchKeyword: event.target.value })}}></input>
              <button class="ui button" class="ui button" type="submit">Search Events</button>
            </div>
          </form>
        </div>
        <div>
          <br></br>
          <form>
            <label>
              Pick event:
              <select  value={this.state.value} onChange={this.postEventOnClick}>
                {this.state.attractions.map(attraction => <option value={attraction}>{attraction}</option>)}
              </select>
              
            </label>
          </form>
        </div>
        <br></br>

        <button class="ui blue button" onClick={this.showEventsOnClick}>{this.state.showFavouritesList ? "Hide my favourites list" : "Show my favourites list"}</button>
        <div>
         {this.state.showFavouritesList ? <FavouritesList destroy={this.destroy} favourites={this.state.favouriteAttractionsFromServer} /> : undefined} 
        </div>
      </div>
    )
  }
}

export default Favourites

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
    showFavouritesList: false,
    attractionToAdd: {}
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
                : data._embedded.attractions.map(attraction => {
                  const container = {};
                  container['name'] = attraction.name;
                  container['tmId'] = attraction.id;
                  return container
                })
          })
        // this.setState({
        //     attractions:
        //       data.page.totalElements === 0
        //         ? window.location.reload(false) &
        //           alert("sorry this event does not exist")
        //         : data._embedded.attractions.map(attraction => attraction.name)
        //   })
         
      )
  }



  getFavouriteAttractions = () => {
    let userId = this.props.userId
    return fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          favouriteAttractionsFromServer: data.favourites.map(attraction => `${attraction.id}:${attraction.name}`)
          // favouriteAttractionsFromServer: [
          //   ...this.state.favouriteAttractionsFromServer,
            
          //     {attractionId: data.id,
          //     attractionName: data.name}
            
          // ]
            
          
        })
      }
      )
  }



  postAttraction = (objToAdd) => {   

  let data = {
    user_id: this.props.userId,
    name: objToAdd.name,
    tm_id: objToAdd.tmId
  }
  console.log(data)
     fetch('http://localhost:3000/favourites', {
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify(data)
    }).then(response => response.json()).then(this.setState({favouriteAttractions: [...this.state.favouriteAttractions, data.name]}))
    
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
    event.preventDefault()
    let objToAdd = this.state.attractions.find(({tmId}) => tmId === event.target.value)
    
    
    this.setState({
      attractionToAdd: objToAdd
    })
    
    this.postAttraction(objToAdd)
    
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
        Favourites component
        <div>
          <form
            id="addFavourtiesForm"
            onSubmit={event => this.submittedKeywordHandler(event)}>
            <input
              type="text"
              onChange={event => {
                this.setState({ searchKeyword: event.target.value })
              }}></input>
            <button type="submit">Search Events</button>
          </form>
        </div>
        <div>
          <br></br>
          <form>
            <label>
              Pick Attraction:

              <select  onChange={this.postEventOnClick}>
                {this.state.attractions.map(attraction => <option value={attraction.tmId}>{attraction.name}</option>)}
              </select>
            </label>
          </form>
        </div>
        <button onClick={this.showEventsOnClick}>{this.state.showFavouritesList ? "Hide my favourites list" : "Show my favourites list"}</button>
        <div>
         {this.state.showFavouritesList ? <FavouritesList destroy={this.destroy} favourites={this.state.favouriteAttractionsFromServer} /> : undefined} 
        </div>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    )
  }
}

export default Favourites

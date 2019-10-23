import React, { Component } from "react"
import Login from "./Login"
import FavouritesList from "./FavouritesList"


class Favourites extends Component {
  state = {
    attractions: [],
    searchKeyword: "",
    favouriteAttractions: [],
    showFavouritesList: false,
    queryReturn: {}
  }


  componentDidMount() {
    this.getFavouriteAttractions()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.queryReturn !== prevState.queryReturn &&
      this.state.queryReturn !== {}
    ) {
      return this.processQueryData(this.state.queryReturn)
     console.log('hi')
    }else if (this.props.userId !== prevProps.userId) {
  this.getFavouriteAttractions()
    }else if (this.state.favouriteAttractions !== prevState.favouriteAttractions && this.state.favouriteAttractions !== []){
      this.props.getFavourites(this.state.favouriteAttractions)
    }
  }

  getAttractions = () => {
    return fetch(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${this.state.searchKeyword}&apikey=2sQ195wxoeK8TTLpFxB8XPY5WHbaFyBm`,
      {method: "GET"
    }
    )
      .then(response => response.json())
      .then(data => {
        if (data.page.totalElements === 0) 
        { return window.location.reload(false) & alert("sorry this event does not exist")
      }else this.setState({
          queryReturn: data
        })
      })
      // .then(data =>
      //   this.setState({
      //       attractions:
      //         data.page.totalElements === 0
      //           ? window.location.reload(false) &
      //             alert("sorry this event does not exist")
      //           : data._embedded.attractions.map(attraction => {
      //             const container = {};
      //             container['name'] = attraction.name;
      //             container['tmId'] = attraction.id;
      //             return container
      //           })
      //     })
      // )
  }

  processQueryData = (data) => {
    this.setState({
          attractions:
            data._embedded.attractions.map(attraction => {
                const container = {};
                container['name'] = attraction.name;
                container['tmId'] = attraction.id;
                return container
              })
        })
    
  }



  getFavouriteAttractions = () => {
    let userId = this.props.userId
    return fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          //favouriteAttractionsFromServer: data.favourites.map(attraction => `${attraction.id}:${attraction.name}`),
          //favouriteAttractionsFromServer: data.favourites.map(attraction => `${attraction.id}:${attraction.name}`),
          favouriteAttractions: data.favourites
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
    }).then(response => response.json()).then(newAttract => this.setState({favouriteAttractions: [...this.state.favouriteAttractions, newAttract]}))
    
  }

  searchKeywordHandler = event => {
    this.setState({ searchKeyword: event.target.value })
  }

  submittedKeywordHandler = event => {
    event.preventDefault()
    this.setState({ submittedKeyword: this.state.searchKeyword })
    this.getAttractions()
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
      let newFavourites = this.state.favouriteAttractions.filter(attraction => attraction.id != data.id )
      // let newFavourites = this.state.favouriteAttractionsFromServer.filter(attraction => attraction.split(':')[0] != data.id )
      this.setState({favouriteAttractions: newFavourites})
    })
  }

  render() {
    return (
      <div>
        <h5>Search for an artist or team you want to track</h5>
        <div>
          <form
            id="addFavourtiesForm"
            onSubmit={event => this.submittedKeywordHandler(event)}>
              <div class="ui icon input">
            <input
              type="text"
              onChange={event => {
                this.setState({ searchKeyword: event.target.value })
              }}></input>
              
            <button class="ui button" type="submit">Search Events</button>
            </div>
          </form>
        </div>
        <div>
          <br></br>
          <form>
            <label>
              Pick Attraction:

              <select  onChange={this.postEventOnClick}>
                My favourites 
                {this.state.attractions.map(attraction => <option value={attraction.tmId}>{attraction.name}</option>)}
              </select>
            </label>
          </form>
        </div>
        {/* <button class="ui button" onClick={this.showEventsOnClick}>{this.state.showFavouritesList ? "Hide my favourites list" : "Show my favourites list"}</button> */}
        <div>
         {/* {this.state.showFavouritesList ? <FavouritesList destroy={this.destroy} favourites={this.state.favouriteAttractionsFromServer} /> : undefined}  */}
        <br></br>
        <br></br>
        My Favourites:
        
            {typeof this.state.favouriteAttractions !== 'undefined' ? <FavouritesList destroy={this.destroy} favourites={this.state.favouriteAttractions}/> : undefined}
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

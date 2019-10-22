import React, { Component } from "react"

class FavouritesList extends Component {

  

  uniqueFavourites = () => {
    return [...new Set(this.props.favourites.map(attraction => attraction))]
  }

  render() {
    return (
      <div>
        <ul id="addFavouritesList">
          {this.uniqueFavourites().map(attraction => (
            <li key={attraction.id}> {attraction.name}<button onClick={() => this.props.destroy(attraction.id)} >Delete</button></li>
          // {this.uniqueFavourites().map(attraction => (
          //   <li>{attraction.split(':')[1]}<button onClick={() => this.props.destroy(attraction.split(':')[0])} >Delete</button></li>
          ))}
        </ul>
      </div>
    )
  }
}

//

export default FavouritesList

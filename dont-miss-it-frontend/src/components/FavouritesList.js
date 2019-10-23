import React, { Component } from "react"

class FavouritesList extends Component {

  

  uniqueFavourites = () => {
    if (typeof this.props.favourites.length !== 'undefined' > 0) {
    return [...new Set(this.props.favourites.map(attraction => attraction))]
    }
  }

  render() {
    return (
      <div>
        <ul id="addFavouritesList">
          {
            typeof this.props.favourites !== 'undefined' ?
            this.uniqueFavourites().map(attraction => (
            <li key={attraction.id}> {attraction.name}<button class="ui google plus circular icon button" id="button" onClick={() => this.props.destroy(attraction.id)}><i aria-hidden="true" class="delete link icon"></i></button></li>
          // {this.uniqueFavourites().map(attraction => (
          //   <li>{attraction.split(':')[1]}<button onClick={() => this.props.destroy(attraction.split(':')[0])} >Delete</button></li>
          ))
            : undefined
          }
        </ul>
      </div>
    )
  }
}

//

export default FavouritesList

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
            <li>{attraction.split(':')[1] }<button class="ui google plus circular icon button" id="button" onClick={() => this.props.destroy(attraction.split(':')[0])}><i aria-hidden="true" class="delete link icon"></i></button></li>
          ))}
        </ul>
      </div>
    )
  }
}

//

export default FavouritesList

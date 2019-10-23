import React, { Component } from 'react';

export class MatchSet extends Component {




    mapMatches = () => {
        if (this.props.matches.length > 0) {
        return this.props.matches.map(event => {
          return (
          <div>
            <h3>I'm a match!!</h3>
            <h5>{event.eventName} - {event.date}</h5>
            <p>{event.venue}</p>
            <p>Tickets are {event.onSale === 'onsale' ? 'On Sale' : 'Not on sale'}</p>
            <p><a href={event.link} target="_blank">Click here for event details</a></p>
            </div>
          )
        }
        )
    }else {return undefined}

    }



    render() {
        return (
            <div>
            {this.mapMatches()}
            </div>
        );
    }
    

}

export default MatchSet;

// <div>
//     <h3>I'm a match!!</h3>
//     <h5>{event.eventName} - {event.date}</h5>
//     <p>{event.venue}</p>
//     <p>Tickets are {event.onSale === 'onsale' ? 'On Sale' : 'Not on sale'}</p>
//     <p><a href={event.link} target="_blank">Click here for event details</a></p>
// </div>
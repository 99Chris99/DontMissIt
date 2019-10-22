import React, { Component } from 'react';

export class MatchSet extends Component {
    render() {
        return (
            <div>
                <h5>{this.props.eventName} - {this.props.date}</h5>
                <p>{this.props.venue}</p>
                <p>Tickets are {this.props.onSale === 'onsale' ? 'On Sale' : 'Not on sale'}</p>
                <p><a href={this.props.link} target="_blank">Click here for event details</a></p>
            </div>
        );
    }
}

export default MatchSet;

import React, { Component } from 'react';

export class Matches extends Component {
    
    
    state = {
        events: [],
        currentGet: {}
    }
    
    componentDidMount () {
        return this.getApi('K8vZ917p1df')
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentGet !== prevState.currentGet){
            this.populateevents()
        }
    }


    getApi = (tmId) => {
      return  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=5&attractionId=${tmId}&apikey=2sQ195wxoeK8TTLpFxB8XPY5WHbaFyBm`,
        {method: "GET"}
        )
        .then(response => response.json()).then(data => {
            let newData = data._embedded.events
            this.setState({currentGet: newData})
        })
        //(data => console.log(data._embedded.events))
    }

    populateevents = () => {
        let tmId = 'K8vZ917p1df'
        let newObject = {[`${tmId}`]: this.state.currentGet}
        this.setState({
            events: [
                ...this.state.events,
                newObject
            ]
        })


    }
    
    
    
    
    
    
    
    render() {
        return (
            <div>
                <h3>It's a match!</h3>
            </div>
        );
    }
}

export default Matches;

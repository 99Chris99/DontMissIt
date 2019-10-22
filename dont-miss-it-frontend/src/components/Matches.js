import React, { Component } from 'react';
import MatchSet from './MatchSet';

export class Matches extends Component {
    
    
    state = {
        events: [],
        currentGet: {},
        freeDates: ['2019-11-23', '2019-12-01'],
        eventMatches: []
    }
    
    componentDidMount () {
        return this.getApi('K8vZ917p1df')
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentGet !== prevState.currentGet){
            this.populateevents()
        }
        if (this.state.events !== prevState.events){
            this.findMatches()
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
        //let newObject = {[`${tmId}`]: this.state.currentGet}
        let newObject = {
            tmId: tmId,
            eventDetails: this.state.currentGet}
        this.setState({
            events: [
                ...this.state.events,
                newObject
            ]
        })
    }
    
    
    findMatches = () => {
        console.log(this.state.events)
        for (let index = 0; index < this.state.events.length; index++) {
            const event = this.state.events[index];
            
                
            for (let index = 0; index < event.eventDetails.length; index++) {
                const details = event.eventDetails[index];
                
                if (this.state.freeDates.includes(details.dates.start.localDate)) {
                  return  < MatchSet eventName={details.name} date={details.dates.start.localDate} onSale={details.dates.status.code} link={details.url} venue={details._embedded.venues[0].name}/>
                }

            }
    
            console.log(event.eventDetails)
            
        }
    }
    
    
    
    
    render() {
        return (
            <div>
                <h3>It's a match!</h3>
                {this.findMatches()}
            </div>
        );
    }
}

export default Matches;

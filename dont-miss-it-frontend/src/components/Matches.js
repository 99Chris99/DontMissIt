import React, { Component } from 'react';
import MatchSet from './MatchSet';

export class Matches extends Component {
    
    constructor(props) {
        super();
          this.state = {
              freeDates: props.dates,
              favourites: props.favourites,
              events: [],
            currentGet: {},
            eventMatches: [],
        };
        }



    // state = {
    //     events: [],
    //     currentGet: {},
    //     freeDates: ['2019-11-23', '2019-12-01'],
    //     eventMatches: []
    // }
    
   
    
    runUpdate = () => {
       
      let searchString = this.props.favourites.map(fav => {return `&attractionId=${fav.tm_id}`}).join('')

      return this.getApi(searchString)
       console.log(searchString)

    //     for (let index = 0; index < this.props.favourites.length; index++) {
    //        const attraction = this.props.favourites[index];
    //    attraction.tm_id ? searchString=`${attraction.tm_id}` : console.log('Errorrrrrrr')
    //    }
       
        //return this.getApi('K8vZ917p1df')

    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.favourites !== prevProps.favourites){
            this.runUpdate()
        }else if (this.props.dates !== prevProps.dates){
            this.runUpdate()
        }else if (this.state.currentGet !== prevState.currentGet){
            this.populateevents()
        }else if (this.state.events !== prevState.events){
            this.findMatches()
        }
    }


    

    getApi = (tmId) => {
      return  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=5${tmId}&apikey=2sQ195wxoeK8TTLpFxB8XPY5WHbaFyBm`,
        {method: "GET"}
        )
        .then(response => response.json()).then(data => {

            if (data.page.totalPages > 0){
                console.log(data)
            let newData = data._embedded.events
            this.setState({currentGet: newData})
            }
        })
    
        //(data => console.log(data._embedded.events))
    }

    populateevents = () => {


        for (let index = 0; index < this.state.currentGet.length; index++) {
            const element = this.state.currentGet[index];
            
            let tmId = 'K8vZ917p1df'
            //let newObject = {[`${tmId}`]: this.state.currentGet}
            let newObject = {
              //  tmId: tmId,
                eventDetails: element}
            this.setState({
                events: [
                    ...this.state.events,
                    newObject
                ]
            })

            
        }
     //   this.forceUpdate()
    }
    
    
    findMatches = () => {
        console.log('start findMatches')
        for (let index = 0; index < this.state.currentGet.length; index++) {
            const element = this.state.currentGet[index];


            console.log('props: ' + this.props.dates)
            console.log('fordata: ' + element.dates.start.localDate)

            if (this.props.dates.includes(element.dates.start.localDate)) {
                let details = element
                console.log('hihi')

                let newObj = {
                    eventName: details.name,
                    date: details.dates.start.localDate,
                    onSale: details.dates.status.code,
                    link: details.url,
                    venue: details._embedded.venues[0].name
                }

                this.setState({
                    eventMatches: [...this.state.eventMatches,
                    newObj]
                })

               // return  < MatchSet eventName={details.name} date={details.dates.start.localDate} onSale={details.dates.status.code} link={details.url} venue={details._embedded.venues[0].name}/>
              }
        }
        
        // console.log(this.state.events)
        // for (let index = 0; index < this.state.events.length; index++) {
        //     const event = this.state.events[index]
                
        //     for (let index = 0; index < event.eventDetails.length; index++) {
        //         const details = event.eventDetails[index];
        //         console.log('hihi')
        //         if (this.state.freeDates.includes(details.dates.start.localDate)) {
        //           return  < MatchSet eventName={details.name} date={details.dates.start.localDate} onSale={details.dates.status.code} link={details.url} venue={details._embedded.venues[0].name}/>
        //         }
        //     }
        //     console.log(event.eventDetails)
        // }
    }
    
    
    
    
    render() {
        return (
            <div>
                <h3>It's a match!</h3>
                <button onClick={() => this.state.currentGet.length > 1 ? this.findMatches() : undefined }>Update Matches</button>
                      <MatchSet matches={this.state.eventMatches} />
                      
                
            </div>
        );
    }
}

export default Matches;

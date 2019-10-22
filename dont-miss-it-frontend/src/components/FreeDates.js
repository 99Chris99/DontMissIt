import React, { Component } from 'react';

export class FreeDates extends Component {
state={
    selectedDate: '',
    selectedDates: []
}

listDates = (event) => {
    event.preventDefault()
    this.setState({
        selectedDates: [
            ...this.state.selectedDates,
            this.state.selectedDate
        ]
    }
    ) 

    
    
}
    

    render() {
        return (
            <div>
               <form onSubmit={(event) => this.listDates(event)}>
                 <div class="ui icon input">
                <input type="date" onChange={event => {this.setState(
                    {selectedDate: event.target.value})}}></input>
                <button type="submit">Add Date</button>
                </div>
               </form>
                <br></br>
               <div>
                   <h5>I'm free on...</h5>
                   <ul>
                   {this.state.selectedDates.map(date => <li>{date}</li>)}
                   </ul>
               </div>
            </div>
            
        );
    }
}

export default FreeDates;

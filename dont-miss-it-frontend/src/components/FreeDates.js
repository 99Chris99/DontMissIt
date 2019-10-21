import React, { Component } from 'react';

export class FreeDates extends Component {
state={
    selectedDate: '',
    selectedDates: [],
    user: 4
}

componentDidMount (user) {
    this.getUserDates(user)
}

getUserDates = (user) => {
    fetch(`http://localhost:3000/free_dates`).then(response => response.json()).then(console.log)
}


addDates = (event) => {
    event.preventDefault()
    this.setState({
        selectedDates: [
            ...this.state.selectedDates,
            this.state.selectedDate
        ]
    }
    )    
}

removeDate = (deleteDate) => {
    console.log(deleteDate)
    let newDates = this.state.selectedDates.filter(date => date !== deleteDate)
    console.log(newDates)
    this.setState({
        selectedDates: newDates
    })
}

listDates = () => {
   return this.state.selectedDates.map(date => <li key={date}> {date}  <button onClick={() => this.removeDate(date)}>Delete</button></li>)
}
    

//(event, date) => {this.removeDate(event, date)}

    render() {
        return (
            <div>
               <form onSubmit={(event) => this.addDates(event)}>
                <input type="date" onChange={event => {this.setState(
                    {selectedDate: event.target.value})}}></input>
                <button type="submit">Add Date</button>
               </form>

               <div>
                   <h5>I'm free on...</h5>
                   <ul>
                   {this.listDates()}
                   </ul>
               </div>
            </div>
        );
    }
}

export default FreeDates;

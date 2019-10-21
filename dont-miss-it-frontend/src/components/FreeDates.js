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

getUserDates = () => {
    fetch(`http://localhost:3000/users/${this.state.user}`).then(response => response.json()).then(dates => this.setState({selectedDates: dates.free_dates}))    
    

}


addDates = (event) => {
    event.preventDefault()
    let data = {
        user_id: this.state.user,
        date: this.state.selectedDate
    }  
        fetch(`http://localhost:3000/free_dates/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json())     
    .then(newDate => {
    this.setState({
        selectedDates: [
            ...this.state.selectedDates,
            newDate
        ]
    }
    )   
}) 
}

removeDate = (deleteDate) => {

    let dateToGo = deleteDate.id

    fetch(`http://localhost:3000/free_dates/${dateToGo}`,{
    method: "DELETE"
    }
    )
.then(response => response.json()).then(byeDate => {
    let newDates = this.state.selectedDates.filter(date => date.id !== byeDate.id)
    this.setState({
        selectedDates: newDates
    })
})
}

listDates = () => {
   return this.state.selectedDates.map(date => <li key={date.id}> {date.date}  <button onClick={() => this.removeDate(date)}>Delete</button></li>)
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

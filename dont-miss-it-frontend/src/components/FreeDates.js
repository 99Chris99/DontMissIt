import React, { Component } from 'react';

export class FreeDates extends Component {

constructor(props) {
super();
  this.state = {
    selectedDate: '',
    selectedDates: [],
    user: props.userId.id
   
};
}



componentDidUpdate (prevProps, preState) {
    if (this.state.selectedDates !== preState.selectedDates){
        this.props.getSelectedDates(this.state.selectedDates)
   }else if (this.props.userId.id !== prevProps.userId.id) {
       this.getUserDates()
        this.setState({user: this.props.userId.id})
    }
}

    
//     componentDidMount () {
//     this.getUserDates()
//     console.log(this.props.userId)
// }

getUserDates = () => {
    console.log('hellooo' + this.state.user)
    fetch(`http://localhost:3000/users/${this.props.userId.id}`).then(response => response.json()).then(dates => this.setState({selectedDates: dates.free_dates}))    
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

        if (typeof this.state.selectedDates !== 'undefined'){
    this.setState({
        selectedDates: [
            ...this.state.selectedDates,
            newDate
        ]
    })   
}else{
    this.setState({
        selectedDates: [
           
            newDate
        ]
    })   
}
    }

) 
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
    //if (this.state.selectedDates.length > 0) {
    if (typeof this.state.selectedDates !== 'undefined') {
   return this.state.selectedDates.map(date => <li key={date.id}> {date.date}  <button class="ui google plus circular icon button" id="button" onClick={() => this.removeDate(date)}><i aria-hidden="true" class="delete link icon"></i></button></li>)
    }
}


    

//(event, date) => {this.removeDate(event, date)}

    render() {
        return (
            <div>
                <h5>Add the dates you're free:</h5>
               <form onSubmit={(event) => this.addDates(event)}>
               <div class="ui icon input">
                <input type="date" onChange={event => {this.setState(
                    {selectedDate: event.target.value})}}></input>
                <button class="ui button" type="submit">Add Date</button>
                </div>
               </form>

               <div>
                 <br></br>
                   I'm free on:
                   <ul>
                   {this.listDates()}
                   </ul>
               </div>
            </div>
        );
    }
}

export default FreeDates;

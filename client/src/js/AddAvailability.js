
import React, { Component } from 'react';
import { Grid, Col, Button } from 'react-bootstrap';
import request from 'superagent';
import '../styles/date.css';
// need a calendar as per:

//https://doodle.com/poll/i78zw9vimvgyiw5c#calendar

// need to be able to set availability only for the next week
// need to request data to see what availability i've already set

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];

class AddAvailability extends Component {

  constructor() {
    super();
    this.state = {
      availability: ["Fri Sep 07 2018 23:59:59 GMT+0100 (British Summer Time)"],
      dates: []
    }

    this.updateAvailavility = this.updateAvailavility.bind(this);
  }

  componentDidMount() {
    // get next 7 dates
    this.getDatesForTheWeek();
  }

  getDatesForTheWeek() {
    let dates = [];
    for(let i=0;i<7;i++) {
      let nextDay = new Date();
      let endOfDayDate = new Date(nextDay.getFullYear()
            ,nextDay.getMonth()
            ,nextDay.getDate()
            ,23,59,59);
      endOfDayDate.setDate(endOfDayDate.getDate()+i);
      dates.push(endOfDayDate);
    }
    this.setState({
      dates
    });
  }

  formatAvailability() {
    return {

    }
  }

  updateAvailavility(e) {
    if(this.state.availability.indexOf(e.target.value) < 0) {
      let newAvailibility = this.state.availability;
      newAvailibility.push(e.target.value);
      this.setState({
        availability: newAvailibility
      })
    } else {
      let newAvailibility = this.state.availability;
      newAvailibility.splice(this.state.availability.indexOf(e.target.value), 1);
      this.setState({
        availability: newAvailibility
      })
    }
    console.log(this.state.availability);
  }

  submitAvailability(e) {
    e.preventDefault();
    console.log('set my greens');
    request
      .post('http://localhost:3000/api/availabilities')
      .send(this.formatAvailability())
      .set('Accept', 'application/json')
      .then((res) => {
        this.handleSuccessfulSet(res);
      }).catch((err) => {
        this.handleUnsuccessfulSet(err);
      });
  }

  render () {
    return (
      <Grid>
        <Col xs={8} xsOffset={2}>
          <div className="date-container">
            <div className="date-items">
              {this.state.dates.map((i) => {
                return(
                  <div className="date-item" key={i}>
                    <div className="date-header">
                      <div className="date-header__date">{i.getDate()} {months[i.getMonth()]}</div>
                      <div className="date-header__day">{days[i.getDay()]}</div>
                    </div>
                    <div className="date-availability">
                      <label title="update-availability">
                        <input defaultChecked={this.state.availability.indexOf(i.toString()) !== -1}  name={i} value={i} onClick={this.updateAvailavility} type="checkbox" />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="btn-container">
            <Button onClick={this.submitAvailability.bind(this)} bsStyle="success">Set My Greens!</Button>
          </div>
        </Col>
      </Grid>
    )
  }
  
}

export default AddAvailability;
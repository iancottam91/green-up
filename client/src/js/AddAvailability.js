
import React, { Component } from 'react';
import { Grid, Col, Button } from 'react-bootstrap';
import '../styles/date.css';
import { connect } from 'react-redux';
import { get, getAvailabilityFilter } from './utils/api';
import { post, deleteItem } from './utils/api';
// need a calendar as per:

//https://doodle.com/poll/i78zw9vimvgyiw5c#calendar

// need to be able to set availability only for the next week
// need to request data to see what availability i've already set

const token = 'QLaWTpZESronSIFc1UblnnDPtwNH3Hma3KP3YCobzLwkfqszK2wRwWRKA2kjq7h2';
const userId = 'test';

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];

export class AddAvailability extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      hasLoadedAvailabilities: false,
      initialAvailability: [], // to keep track of availabilities for deletion
      availability: [], // to keep track of new availabilities 
      dates: []
    }

    this.updateAvailavilityInState = this.updateAvailavilityInState.bind(this);
  }

  componentDidMount() {
    // get next 7 dates
    const weekDates = this.getDatesForTheWeek();
    this.setState({
      dates: weekDates
    });
    this.props.user ? this.getMyAvailabilityForTheWeek(weekDates) : undefined;
  }

  getMyAvailabilityForTheWeek(weekDates) {
    const today = weekDates[0];
    const endOfWeek = weekDates[weekDates.length -1];

    // set actual user id and actaul token //

    const filter = getAvailabilityFilter(userId, today, endOfWeek);
    
    // get my availabilities for this week
    get('/availabilities', token, JSON.stringify(filter)).then((res) => {
      const availableDates = res.body.map((data) => {
        return data.availability;
      });
      const initialAvailability = res.body.map((data) => {
        return {
          availability: data.availability,
          id: data.id
        };
      });
      this.setState({
        availability: availableDates,
        initialAvailability,
        hasLoadedAvailabilities: true,
      });
      console.log(this.state);
    }).catch((err) => {
      console.error(err);
    });
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
      dates.push(endOfDayDate.toISOString());
    }
    return dates;
  }

  formatAvailabilityForPost() {
    const availabilityEntries = [];
    this.state.availability.map((date) => {
      return availabilityEntries.push({
        // userId: 'this.props.user.id',
        userId,
        availability: date
      })
    });
    return availabilityEntries;
  }

  // update availability in the app after interacting with a checkbox
  updateAvailavilityInState(e) {
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
  }

  /*
  * initialAvailability - [{
      availability {ISO date string}
      id: {string}
    }] - availability in the DB
  * {[string]} setAvailability - new availability from the UI
  * 
  */
  extractAvailabilityIdsForDelete(initialAvailability, setAvailability) {
    const idsToDelete = [];
    initialAvailability.map((inital) => {
      setAvailability.indexOf(inital.availability) >= 0 ? undefined : idsToDelete.push(inital.id);
    });
    return idsToDelete;
  }

  // if a user does change anything, the old db entries are delete and new added to save effort
  submitAvailability(e) {
    e.preventDefault();

    // add all new availabilities
    post(`/availabilities?access_token=${token}`, this.formatAvailabilityForPost())
      .then((res) => {
        this.handleSuccessfulSet(res);
      }).catch((err) => {
        this.handleUnsuccessfulSet(err);
      });
    
    // delete availabilities - just delete all original entries
    const idsToDelete = this.extractAvailabilityIdsForDelete(this.state.initialAvailability , []);
    for(var i=0; i<idsToDelete.length; i++) {
      deleteItem('/availabilities', token, idsToDelete[i])
      .then((res) => {
        // console.log(res);
      }).catch((err) => {
        console.error(err);
      });
    }

  }

  handleSuccessfulSet(res) {
    console.log(res);
  }

  handleUnsuccessfulSet(error) {
    console.error(error);
  }

  render () {
    return (
      <Grid>
        <Col xs={8} xsOffset={2}>
          <div className="date-container">
            <div className="date-items">
              {this.state.dates.map((i) => {
                const date = new Date(i);
                return(
                  this.state.hasLoadedAvailabilities ?
                    <div className="date-item" key={date}>
                      <div className="date-header">
                        <div className="date-header__date">{date.getDate()} {months[date.getMonth()]}</div>
                        <div className="date-header__day">{days[date.getDay()]}</div>
                      </div>
                      <div className="date-availability">
                        <label title="update-availability">
                          <input defaultChecked={this.state.availability.indexOf(i) !== -1}  name={i} value={i} onClick={this.updateAvailavilityInState} type="checkbox" />
                        </label>
                      </div>
                    </div> : undefined
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAvailability);

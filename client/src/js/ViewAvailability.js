import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { get, getAvailabilityFilter } from './utils/api';
import { setWeekDates } from './store/action/dates';

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];

export class ViewAvailability extends Component {

  componentDidMount() {
    this.props.setWeekDates();
  }

  componentDidUpdate() {
    // only if dates changed!
    
      const filter = getAvailabilityFilter(undefined, this.props.dates.currentWeek[0], this.props.dates.currentWeek[6]);
      console.log(filter);
      this.props.user.token ? get('/availabilities', this.props.user.token, filter).then((res) => {
          console.log('availabilities: ');
          console.log(res.body);
        }): null;
  }

  filterAvailabilityByDate () {
    return [];
  }

  render () {
    return (
      <div>
          <div className="date-container">
            <div className="date-items">
              {this.props.dates && this.props.dates.currentWeek ? this.props.dates.currentWeek.map((i) => {
                const date = new Date(i);
                return(
                    <div className="date-item" key={date}>
                      <div className="date-header">
                        <div className="date-header__date">{date.getDate()} {months[date.getMonth()]}</div>
                        <div className="date-header__day">{days[date.getDay()]}</div>
                      </div>
                      <div className="date-availability"></div>
                    </div>
                );
              }) : undefined}
            </div>
          </div>
        </div>
    )
  }
  
}

const mapStateToProps = state => ({
  user: state.user,
  dates: state.dates
});

const mapDispatchToProps = {
  setWeekDates: () => dispatch => dispatch(setWeekDates()),
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAvailability);
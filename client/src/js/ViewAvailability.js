import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';

class ViewAvailability extends Component {

  render () {
    return (
      <Grid>
        <Col xs={6} xsOffset={3}>
          <div>View Availability</div>
        </Col>
      </Grid>
    )
  }
  
}

export default ViewAvailability;
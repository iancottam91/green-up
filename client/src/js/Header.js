import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { Grid, Col } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <header>
        <Grid>
          <Col xs={6} xsOffset={3}>
            <div className="header-container">
              <span className="logo">Green Up</span>
              {
                this.props.user.username === '' ? 
                <span>
                  <Link to="/login">
                    <Button bsStyle="success">Login</Button>
                  </Link>
                  <Link to="/auth/facebook">
                    <Button bsStyle="success">Login with Facebook</Button>
                  </Link>
                </span>  : <span>{this.props.user.realm}</span>
              }
            </div>
          </Col>
        </Grid>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-container">
          <span className="logo">Green Up</span>
          {
            this.props.user.username === '' ? 
            <span>
              {/* <Link to="/login">
                <Button bsStyle="success">Login</Button>
              </Link> */}
              {/* <a href="/auth/facebook">
                <Button bsStyle="success">Login with Facebook</Button>
              </a> */}
            </span>  :
              <span className="login-details-container">
                <span id="username">{this.props.user.username}</span>
                <a href="/auth/logout">
                  <button className="btn">Logout</button>
                </a>
              </span>
          }
        </div>
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

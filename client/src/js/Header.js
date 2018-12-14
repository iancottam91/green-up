import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <header>
        <div>
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
                  <span>
                    <span>{this.props.user.username}</span>
                    <a href="/auth/logout">
                      <Button bsStyle="success">Logout</Button>
                    </a>
                  </span>
              }
            </div>
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

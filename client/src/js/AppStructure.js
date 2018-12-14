import React, {Component} from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { addUserToken, addUserDetails } from './store/action/user';
const cookie = require('cookie');

class AppStructure extends Component {

  constructor(props, context) {
    super(props, context);
    const parsedCookies = cookie.parse(document.cookie || '');
    if(props.appState && props.appState.user && props.appState.user.token) {
      console.log(`Logged in! Access token ${props.appState.user.token}`);
    }

    if(parsedCookies && parsedCookies.user) {
      let userDetails = JSON.parse(parsedCookies.user);
      let userAccess = JSON.parse(parsedCookies.userAccess);
      console.log(`O auth cookie set!`);
      console.log(userDetails);
      console.log(userAccess);
      if(!props.appState.user.token ||
        (props.appState.user.token && props.appState.user.token !== userAccess.id)
      ) {
        this.props.addUserToken(userAccess.id);
      }
      this.props.addUserDetails({
        username: userDetails[0].profile.name.givenName + ' ' + userDetails[0].profile.name.familyName,
        id: userDetails[0].userId
      })
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        {this.props.children}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  appState: state,
});

const mapDispatchToProps = {
  addUserToken: token => dispatch => dispatch(addUserToken(token)),
  addUserDetails: userDetails => dispatch => dispatch(addUserDetails(userDetails))
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStructure);

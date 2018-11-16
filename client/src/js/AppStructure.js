import React, {Component} from 'react';
import Header from './Header';
const cookie = require('cookie');

class AppStructure extends Component {

  constructor(props, context) {
    super(props, context);
    const parsedCookies = cookie.parse(document.cookie || '');
    console.log(parsedCookies);
    if(parsedCookies && parsedCookies.user) {
      let userDetails = JSON.parse(parsedCookies.user);
      console.log(userDetails);
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }

}

export default AppStructure;
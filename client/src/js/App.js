import React, { Component } from 'react';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import './../styles/App.css';
import { Router, Route, browserHistory } from 'react-router';
import ViewAvailability from './ViewAvailability';
import AddAvailability from './AddAvailability';

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      accessToken: ''
    }

    this.setAccessToken = this.setAccessToken.bind(this);
  }

  setAccessToken(token) {
    this.setState({
      accessToken: token
    })
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Router history={browserHistory}>
          <Route path="/register" component={Register}></Route>
          <Route 
            path="/login"
            component={Login}
            username={this.state.username}
            setAccessToken={this.setAccessToken}
          ></Route>
          <Route 
            path="/view-greens"
            component={ViewAvailability}
            accessToken={this.state.accessToken}
          ></Route>
          <Route
            path="/set-my-greens"
            component={AddAvailability}
            accessToken={this.state.accessToken}  
          ></Route>
        </Router>
      </div>
    );
  }
}

export default App;

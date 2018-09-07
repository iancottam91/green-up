import React, { Component } from 'react';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import './../styles/App.css';
import { Router, Route, browserHistory } from 'react-router'
import ViewAvailability from './ViewAvailability';
import AddAvailability from './AddAvailability';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Router history={browserHistory}>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/view-greens" component={ViewAvailability}></Route>
          <Route path="/set-my-greens" component={AddAvailability}></Route>
        </Router>
      </div>
    );
  }
}

export default App;

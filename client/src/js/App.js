import React, { Component } from 'react';
import AppStructure from './AppStructure';
import Register from './Register';
import Login from './Login';
import './../styles/App.css';
import { Router, Route, browserHistory } from 'react-router';
import ViewAvailability from './ViewAvailability';
import AddAvailability from './AddAvailability';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={browserHistory}>
            <Route path="/" component={AppStructure}>
              <Route path="/register" component={Register}></Route>
              <Route 
                path="/login"
                component={Login}
              ></Route>
              <Route 
                path="/view-greens"
                component={ViewAvailability}
              ></Route>
              <Route
                path="/set-my-greens"
                component={AddAvailability}
              ></Route>
            </Route>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;

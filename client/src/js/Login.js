import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addUserToken, addUserDetails } from './store/action/user';
import { post, get } from './utils/api';

class Login extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginUser = this.loginUser.bind(this);
    console.log(props);

    this.state = {
      formValues: {},
      userLoginSuccess: false,
      userLoginFail: false,
    };
  }

  handleChange(event) {
    event.preventDefault();
    let formValues = this.state.formValues;
    let name = event.target.name;
    let value = event.target.value;

    formValues[name] = value;

    this.setState({formValues});
    console.log(this.state.formValues);
  }

  handleSubmit(event) {
    // post to register a user
    event.preventDefault();
    console.log(this.state.formValues);
    this.loginUser(this.state.formValues);
  }

  /*
  * {string} userId - 20 character id from login
  */
  getAndStoreUserDetails(userId) {
    get('/Users/' + userId, this.props.user.token).then((res) => {
      console.log('put details in store');
      this.props.addUserDetails(res.body);
    }).catch((err) => {
      console.error(err);
      console.error('there was an error');
    })
  }

  loginUser(userCredentials) {
    post('/Users/login', userCredentials)
      .then((res) => {
        this.handleSuccessfulRegister(res);
      }).catch((err) => {
        console.error(err);
        this.handleUnsuccessfulRegister(err);
      });
  }

  handleSuccessfulRegister(res) {

    // set user name
    this.props.addUserToken(res.body.id);

    // get user details and add to the store
    this.getAndStoreUserDetails('5b8006fc6262ab7f0d8e3b51')

    // update state based on login attempt
    this.setState({
      userLoginSuccess: true,
      userLoginFail: false
    });
  }

  handleUnsuccessfulRegister(err) {
    console.error(err.response.body.error.message);
    this.setState({
      userLoginSuccess: false,
      userLoginFail: true
    });
  }

  render() {
    return (
      <Grid>
        <Col xs={6} xsOffset={3}>
          {this.state.userLoginSuccess ? 
            <Alert bsStyle="success">User logged in successfully, click here to&nbsp;
              <Link to="/set-my-greens">set my greens</Link>
            </Alert>
          : ''}
          {this.state.userLoginFail ? <Alert bsStyle="danger">Unable login user</Alert> : ''}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup
              controlId="email"
              >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                name="email"
                type="email"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleChange}
                />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="password"
              >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChange}
                />
              <FormControl.Feedback />
            </FormGroup>
          <Button type="submit" bsStyle="success">Login</Button>
        </form>
        </Col>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  addUserToken: token => dispatch => dispatch(addUserToken(token)),
  addUserDetails: userDetails => dispatch => dispatch(addUserDetails(userDetails))
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

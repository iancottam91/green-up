import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import request from 'superagent';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addUserToken } from './store/action/user';

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

  loginUser(userDetails) {
    request
      .post('http://localhost:3000/api/Users/login')
      .send(userDetails)
      .set('Accept', 'application/json')
      .then((res) => {
        this.handleSuccessfulRegister(res);
      }).catch((err) => {
        this.handleUnsuccessfulRegister(err);
      });
  }

  handleSuccessfulRegister(res) {

    // set user name
    this.props.addUserToken(res.body.id);

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
            <Alert bsStyle="success">User logged in successfully
              <Link to="/set-my-greens">Set my greens</Link>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

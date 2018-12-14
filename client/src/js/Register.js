import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import request from 'superagent';

class Register extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.state = {
      formValues: {},
      userAddedSuccess: false,
      userAddedFail: false,
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
    this.registerUser(this.state.formValues);
  }

  registerUser(userDetails) {
    request
      .post('http://localhost:3000/api/Users')
      .send(userDetails)
      .set('Accept', 'application/json')
      .then((res) => {
        this.handleSuccessfulRegister(res);
      }).catch((err) => {
        this.handleUnsuccessfulRegister(err);
      });
  }

  handleSuccessfulRegister(res) {
    this.setState({
      userAddedSuccess: true,
      userAddedFail: false
    });
  }

  handleUnsuccessfulRegister(err) {
    console.error(err.response.body.error.message);
    this.setState({
      userAddedSuccess: false,
      userAddedFail: true
    });
  }

  render() {
    return (
      <div>
          {this.state.userAddedSuccess ? <Alert bsStyle="success">User added successfully</Alert> : ''}
          {this.state.userAddedFail ? <Alert bsStyle="danger">Unable to add user</Alert> : ''}
          <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup
            controlId="username"
            >
            <ControlLabel>Username</ControlLabel>
            <FormControl
              name="username"
              type="text"
              value={this.state.username}
              placeholder="Enter text"
              onChange={this.handleChange}
              />
            <FormControl.Feedback />
          </FormGroup>
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
          <Button type="submit" bsStyle="success">Submit</Button>
        </form>
        </div>
    );
  }
}

export default Register;

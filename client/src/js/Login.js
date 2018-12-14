import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addUserToken, addUserDetails } from './store/action/user';
import { post, get } from './utils/api';


function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

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
      this.props.addUserDetails(res.body);
      // do in othe fn
      const userCookie = [{
        profile: {
          name: {
            givenName: 'username',
            familyName: '',
          }
        }
      }];

      setCookie('user', JSON.stringify(userCookie));

      // res.cookie('user', JSON.stringify(userCookie), {
      //   maxAge: 1000 * 60 * 60,
      // });

    }).catch((err) => {
      console.error(err);
      console.error('there was an error getting user info');
    })
  }

  loginUser(userCredentials) {
    post('/Users/login', userCredentials)
      .then((res) => {
        console.log(res);
        this.handleSuccessfulLogin(res);
      }).catch((err) => {
        console.error(err);
        this.handleUnsuccessfulLogin(err);
      });
  }

  handleSuccessfulLogin(res) {

    // set these values in a cookie - the same one as for fb login

    // set user name
    this.props.addUserToken(res.body.id);

    // get user details and add to the store
    this.getAndStoreUserDetails(res.body.userId)

    // [0].profile.name.givenName
    const userAccessCookie = {
      id: res.body.id
    }

    setCookie('userAccess', JSON.stringify(userAccessCookie));
    
    // res.cookie('userAccess', JSON.stringify(userAccessCookie), {
    //   maxAge: 1000 * 60 * 60,
    // });

    // update state based on login attempt
    this.setState({
      userLoginSuccess: true,
      userLoginFail: false
    });

    // redirect to set greens page ?
    // better to have a nice view of either clicking view greens or set greens
  }

  handleUnsuccessfulLogin(err) {
    console.error(err.response.body.error.message);
    this.setState({
      userLoginSuccess: false,
      userLoginFail: true
    });
  }

  render() {
    return (
        <div className="container-50pc">
          <div className="oauth-login">
            <a href="/auth/facebook">
              <button className="btn login-fb">Login with Facebook</button>
            </a>
          </div>
          <div>
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
          </div>
        </div>
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

import React, { Component } from 'react';
import LogInPage from './LogInPage';
import SignUpPage from './SignUpPage';

class RegistrationPage extends Component {

  componentDidMount() {
    this.checkLogInStatus();
  }
  
  checkLogInStatus = () => {
    if (localStorage.jwt)
      this.props.history.push('/homepage');
    else
      this.logInAlert();
  }

  logInAlert = () => {
    alert('Notes:\nRefresh the page if you forget this info.\nThe Heroku server takes about 30 seconds to wake up due to inactivity.\nLogin credentials:\nUsername: Lawson\nPassword: abc123');
  }

  render() {

    return (
      <div className="registrationPage">

        <div className="headerBar">
          <h1 className="appName">Delightful Texts</h1>
        </div>

        <div className="logInSignUpPages">
          <LogInPage />
          <div className="logInSignUpDivider"></div>
          <SignUpPage />
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
import React, { Component } from 'react';
import LogInPage from './LogInPage';
import SignUpPage from './SignUpPage';

class RegistrationPage extends Component {
  render() {
    return (
      <div>
        <h1>Registration Page</h1>
        <LogInPage />
        <SignUpPage />
      </div>
    );
  }
}

export default RegistrationPage;
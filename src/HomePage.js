import React, { Component } from 'react';
import RegistrationPage from './RegistrationPage'
// import { IceCreamOrderPage } from "/IceCreamOrderPage";

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>This is the HomePage</h1>
        <RegistrationPage />
      </div>
    );
  }
}

export default HomePage;
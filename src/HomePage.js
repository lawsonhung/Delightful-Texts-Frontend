import React, { Component } from 'react';
import IceCreamOrderPage from './IceCreamOrderPage';
import ViewIceCreamOrdersPage from './ViewIceCreamOrdersPage';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>This is the HomePage</h1>
        <IceCreamOrderPage />
        <ViewIceCreamOrdersPage />
      </div>
    );
  }
}

export default HomePage;
import React, { Component } from 'react';

class ViewIceCreamOrdersPage extends Component {

  fetchAllIceCreamOrders = () => {
    fetch('http://localhost:3000/api/v1/ice_cream_orders')
    .then(r => r.json())
    .then(data => console.log("All ice cream orders should show here: ", data))
  }

  render() {
    console.log("this.props for ViewiceCreamOrdersPage: ", this.props);
    
    return (
      <div>
        <h1>All ice cream orders page here</h1>
        {this.fetchAllIceCreamOrders()}
      </div>
    );
  }
}

export default ViewIceCreamOrdersPage;
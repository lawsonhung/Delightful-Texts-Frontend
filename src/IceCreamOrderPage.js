import React, { Component } from 'react';

class IceCreamOrderPage extends Component {

  renderIceCreamOrders = () => {
    
    fetch("http://localhost:3000/api/v1/profile", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.jwt}`
      }
    })
    .then(r => r.json())
    .then(data => {
      // console.log("localStorage.jwt: ", localStorage.jwt);
      console.log("user: ", data)
    })

    return(
      <h2>Ice cream orders</h2>
    )
  }

  render() {
    return (
      <div>
        <h1>Order ice cream page here</h1>
        {this.renderIceCreamOrders()}
      </div>
    );
  }
}

export default IceCreamOrderPage;
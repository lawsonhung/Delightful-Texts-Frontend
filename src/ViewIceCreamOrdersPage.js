import React, { Component } from 'react';

class ViewIceCreamOrdersPage extends Component {

  state = {
    iceCreamOrders: []
  }

  fetchAllIceCreamOrders = () => {
    fetch('http://localhost:3000/api/v1/ice_cream_orders', {
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    })
    .then(r => r.json())
    .then(data => {
      console.log("All ice cream orders should show here: ", data.ice_cream_orders)
      if (this.state.iceCreamOrders.length === 0){
        this.setState({iceCreamOrders: data.ice_cream_orders}, 
          // () => this.renderIceCreamOrders()
        )
      }
    })
  }

  renderIceCreamOrders = () => {
    console.log("Rendericecreamorders hit");
    console.log(this.state.iceCreamOrders);
    
    
    this.state.iceCreamOrders.forEach(order => {
      console.log("Ice cream order: ", order);
      
      return (
        <h2>Order number: {order.id} </h2>
      )
    })
  }

  render() {
    console.log("this.props for ViewiceCreamOrdersPage: ", this.props);

    this.fetchAllIceCreamOrders()
    
    return (
      <div>
        <h1>All ice cream orders page here</h1>
        {this.renderIceCreamOrders()}
      </div>
    );
  }
}

export default ViewIceCreamOrdersPage;
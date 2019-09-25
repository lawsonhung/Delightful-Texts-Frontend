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
      // console.log("All ice cream orders should show here: ", data.ice_cream_orders)
      if (this.state.iceCreamOrders.length === 0){
        this.setState({iceCreamOrders: data.ice_cream_orders}, 
          // () => this.renderIceCreamOrders()
        )
      }
    })
  }

  
  render() {
    console.log("this.props for ViewiceCreamOrdersPage: ", this.props);
    
    this.fetchAllIceCreamOrders()

    const iceCreamOrders = this.state.iceCreamOrders.map(order => {
      
      
      if(order.user_id === parseInt(this.props.userID)){
        console.log("Ice cream order: ", order);
        
        return (
          <h2>Order number {order.id} for user {this.props.userID} </h2>
        )
      } else {
        return (
          <h2>🍦 You didn't order any ice cream yet 🍦</h2>
        )
      }
    })
    
    return (
      <div>
        <h1>All ice cream orders page here</h1>
        {iceCreamOrders}
      </div>
    );
  }
}

export default ViewIceCreamOrdersPage;
import React, { Component } from 'react';

class ViewIceCreamOrdersPage extends Component {

  state = {
    iceCreamOrders: []
  }

  componentDidMount() {
    this.fetchAllIceCreamOrders()
  }

  fetchAllIceCreamOrders = () => {
    fetch('http://localhost:3000/api/v1/ice_creams', {
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    })
    .then(r => r.json())
    .then(data => {
      console.log("What is data?", data)
      // console.log("All ice cream orders should show here: ", data.ice_cream_orders)
      if (this.state.iceCreamOrders.length === 0){
        this.setState({iceCreamOrders: data.ice_creams}, 
          // () => this.renderIceCreamOrders()
        )
      }
    })
  }

  
  render() {
    // console.log("this.props for ViewiceCreamOrdersPage: ", this.props);

    const iceCreamOrders = this.state.iceCreamOrders.map(order => {
      if(order.user_id === parseInt(this.props.userID)){
        console.log("Ice cream order: ", order);
        
        return (
          <h2 key={null}>Order number {order.id} for user {this.props.userID} </h2>
        )
      } else {
        return (
          <h2 key={null}><span role="img" aria-label="ice cream">🍦</span> You didn't order any ice cream yet <span role="img" aria-label="ice cream">🍦</span></h2>
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
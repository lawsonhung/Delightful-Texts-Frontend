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
    .then(iceCreamOrders => {
      console.log("All ice cream orders: ", iceCreamOrders)
      
      this.setState({iceCreamOrders: iceCreamOrders.ice_creams})
    })
  }

  render() {
    // console.log("this.props for ViewiceCreamOrdersPage: ", this.props);
    const userIceCreamOrders = []
    this.state.iceCreamOrders.map(order => {

      if (order.user_id === parseInt(localStorage.userID)){
        userIceCreamOrders.push(order)
      }

      return null
      
    })

    return (
      <div>
        <h1 className="iceCreamOrders"><span role="img" aria-label="devil">😈</span> All of your guilty indulgences (We know everything about you... <span className="username">{localStorage.username}</span>) <span role="img" aria-label="devil">😈</span></h1>
        {userIceCreamOrders.map(order => {
          return (
            <div>
              <h2 key="order description" className="orderDescription">
                  <span role="img" aria-label="ice cream">🍦</span> Order {order.id}: A {order.size} of {order.flavor} ice cream
                  {order.m_and_ms || order.peanuts || order.sprinkles ? " topped with " : null}
                  {order.m_and_ms ? "M&M's" : null} {order.peanuts ? "peanuts" : null} {order.sprinkles ? "sprinkles" : null} 
                  {order.hot_chocolate_fudge ? "finished with some hot chocolate fudge" : null} <span role="img" aria-label="ice cream">🍦</span>
              </h2>
              <br/>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ViewIceCreamOrdersPage;
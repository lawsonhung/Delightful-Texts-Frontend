import React, { Component } from 'react';
import IceCreamOrderPage from './IceCreamOrderPage';
import ViewIceCreamOrdersPage from './ViewIceCreamOrdersPage';
import { connect } from 'react-redux'

class HomePage extends Component {

  state = {
    userID: localStorage.userID,
    iceCreamOrders: [],
    userIceCreamOrders: []
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

  filterUserIceCreamOrders = () => {
    this.state.iceCreamOrders.map(order => {

      if (order.user_id === parseInt(localStorage.userID)){
        this.state.userIceCreamOrders.push(order)
      }

      return null
      
    })
  }

  orderIceCream = () => {
    const updatedOrders = this.state.userIceCreamOrders

    this.state.iceCreamOrders.map(order => {

      if (order.user_id === parseInt(localStorage.userID)){
        updatedOrders.push(order)
      }

      return null
      
    })

    // this.setState({ userIceCreamOrders: updatedOrders })
  }

  updateIceCreamOrders = () => {
    this.filterUserIceCreamOrders()

    // caches.keys()
    // .then(names => {
    //   for (let name of names) {
    //     console.log(name)
    //     caches.delete(name)
    //   }
    // })
  }

  logOut = () => {
    fetch(`http://localhost:3000/api/v1/users/${localStorage.userID}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({

      })
    })
    // localStorage.removeItem('jwt')
    // localStorage.removeItem('userID')
    // localStorage.removeItem('username')
    localStorage.clear()
    this.props.history.push('/')
  }

  render() {
    // console.log("Homepage this.state.userID: ", this.state.userID);
    // console.log("Homepage this.props after connecting to redux store: ", this.props);

    // setInterval(() => this.fetchAllIceCreamOrders(), 5000)
    this.filterUserIceCreamOrders()
    
    return (
      <div>

        <div className="headerBar">
          <h1 className="appName">Delightful Texts</h1>
          <div class="flipCard">
            <button className="logOutBtn flipCardInner" onClick={this.logOut} >Log Out <span  role="img" aria-label="sad face">😢</span> Are you sure??? </button>
          </div>
        </div>

        <div className="homepage " >
          <div className="parallax1">
            <h1 className="welcomeMsg"><span role="img" aria-label="happy">🍨</span> Hey there, {localStorage.username}! <span role="img" aria-label="happy">🍨</span></h1>
            <IceCreamOrderPage 
              filterUserIceCreamOrders={this.filterUserIceCreamOrders} 
              orderIceCream={this.orderIceCream} 
              updateIceCreamOrders={this.updateIceCreamOrders}
            />
        </div>
        
        <div className="parallax2">
          <ViewIceCreamOrdersPage userIceCreamOrders={this.state.userIceCreamOrders} />
        </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  // console.log("redux store: ", store);
  
  return {
    username: store.username,
    password: store.password,
    userData: store.userData
  }
}

export default connect(mapStateToProps, null)(HomePage);
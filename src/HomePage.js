import React, { Component } from 'react';
import IceCreamOrderPage from './IceCreamOrderPage';
import ViewIceCreamOrdersPage from './ViewIceCreamOrdersPage';
import { connect } from 'react-redux'

class HomePage extends Component {

  state = {
    userID: localStorage.userID,
    username: localStorage.username,
    iceCreamOrders: [],
    userIceCreamOrders: []
  }

  componentDidMount() {
    this.fetchAllIceCreamOrders()
    this.fetchProfile()
  }

  fetchAllIceCreamOrders = () => {
    // Local fetch
    // fetch('http://localhost:3000/api/v1/ice_creams', {

    // Local fetch 2 - rebuilding backend
    // fetch('http://localhost:3000/ice_cream_orders', {

    // Heroku fetch
    fetch("https://delightful-texts-backend-2.herokuapp.com/ice_cream_orders", {
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`
      }
    })
    .then(r => r.json())
    .then(iceCreamOrders => {
      console.log("All ice cream orders: ", iceCreamOrders)
      
      this.setState({iceCreamOrders: iceCreamOrders.ice_cream_orders})
    })
  }

  fetchProfile = () => {
    // Local fetch 2 - rebuilding backend
    // fetch('http://localhost:3000/profile',{

    // Heroku fetch
    fetch("https://delightful-texts-backend-2.herokuapp.com/profile", {
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`
      }
    })
    .then(r => r.json())
    .then(user => {
      localStorage.userID = user.id;
      localStorage.username = user.username;

      this.setState({
        username: user.username,
        userID: user.id
      })
    })
  }

  logOut = () => {
    // Local fetch
    // fetch(`http://localhost:3000/api/v1/users/${localStorage.userID}`,{

    // Local fetch 2 - rebuilding backend
    // fetch(`http://localhost:3000/users/${localStorage.userID}`, {

    // Heroku fetch
    fetch(`https://delightful-texts-backend-2.herokuapp.com/users/${localStorage.userID}`, {

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
    this.props.history.push('/registration')
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

  turnOffWelcomeOverlay = () => {
    document.getElementById("welcomeOverlay").style.display = "none";
  }

  turnOnWelcomeOverlay = () => {
    document.getElementById("welcomeOverlay").style.display = "block";
  }

  turnOffHellOverlay = () => {
    document.getElementById("welcomeToHellOverlay").style.display = "none";
  }

  turnOnHellOverlay = () => {
    document.getElementById("welcomeToHellOverlay").style.display = "block";
  }

  render() {
    // console.log("Homepage this.state.userID: ", this.state.userID);
    // console.log("Homepage this.props after connecting to redux store: ", this.props);

    // setInterval(() => this.fetchAllIceCreamOrders(), 5000)
    this.filterUserIceCreamOrders()
    
    return (
      <div>

        <div className="welcomeOverlay" id="welcomeOverlay" onClick={() => this.turnOffWelcomeOverlay()}>
          {
            this.state.username ?
            <h1 className="welcomeOverlayMsg overlayMsg"> Welcome to Delightful Texts, {localStorage.username}!
              <br/>
              Click anywhere to continue 
            </h1> :
            <h1 className="welcomeOverlayMsg overlayMsg">Getting your info...</h1>
          }
        </div>

        <div className="headerBar">
          <h1 className="appName">Delightful Texts</h1>
          <div className="flipCard">
            <button className="logOutBtn flipCardInner" onClick={this.logOut} >Log Out <span className="logOutSadEmoji" role="img" aria-label="sad face">😢</span> Are you sure??? </button>
          </div>
        </div>

        <div className="homepage " >
          <div className="parallax1">
            <h1 className="welcomeMsg"><span role="img" aria-label="happy">🍨</span> Hey there, {localStorage.username}! <span role="img" aria-label="happy">🍨</span></h1>
            <IceCreamOrderPage 
              filterUserIceCreamOrders={this.filterUserIceCreamOrders} 
              orderIceCream={this.orderIceCream} 
              updateIceCreamOrders={this.updateIceCreamOrders}
              turnOnHellOverlay={this.turnOnHellOverlay}
            />

            <div className="welcomeToHellOverlay" id="welcomeToHellOverlay" onClick={() => this.turnOffHellOverlay()}>
              <h1 className="welcomeToHellOverlayMsg overlayMsg"> Welcome to Delightful Texts 2.0... 
                <br/>
                Click anywhere to continue
                <br/>
                Then refresh and scroll down
              </h1> 
            </div>

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
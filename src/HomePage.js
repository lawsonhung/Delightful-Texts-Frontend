import React, { Component } from 'react';
import IceCreamOrderPage from './IceCreamOrderPage';
import ViewIceCreamOrdersPage from './ViewIceCreamOrdersPage';
import { connect } from 'react-redux'

class HomePage extends Component {

  state = {
    userID: localStorage.userID
  }

  fetchUserData = () => {

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
    
    
    return (
      <div>

        <div className="headerBar">
          <h1 className="appName">Delightful Texts</h1>
          <button className="logOutBtn" onClick={this.logOut} >Log Out <span role="img" aria-label="sad face">😢</span> Are you sure??? </button>
        </div>

        <div className="homepage backgroundImg " >
          <h1 className="welcomeMsg"><span role="img" aria-label="happy">🍨</span> Hey there, {localStorage.username}! <span role="img" aria-label="happy">🍨</span></h1>
          <IceCreamOrderPage />
          <ViewIceCreamOrdersPage />
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
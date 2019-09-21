import React, { Component } from 'react';
import IceCreamOrderPage from './IceCreamOrderPage';
import ViewIceCreamOrdersPage from './ViewIceCreamOrdersPage';

class HomePage extends Component {

  state = {
    userID: localStorage.userID
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
    localStorage.removeItem('jwt')
    localStorage.removeItem('userID')
    this.props.history.push('/')
  }

  render() {
    console.log("Homepage this.state.userID: ", this.state.userID);
    
    return (
      <div className="homepage" >
        <h1>This is the HomePage</h1>
        <button onClick={this.logOut} >Log out</button>
        <IceCreamOrderPage />
        <ViewIceCreamOrdersPage userID={this.state.userID}/>
      </div>
    );
  }
}

export default HomePage;
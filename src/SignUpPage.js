import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class SignUpPage extends Component {

  handleUsernameChange = (e) => {
    this.props.updateUsername(e.target.value)
  }

  handlePasswordChange = (e) => {
    this.props.updatePassword(e.target.value)
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault()

    // Local fetch
    // fetch("http://localhost:3000/api/v1/users", {

    // Local fetch 2 - rebuilding backend
    // fetch("http://localhost:3000/signup", {
    
    // Heroku fetch
    fetch("https://delightful-texts-backend-2.herokuapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "username": this.props.username,
        "password": this.props.password
      })
    })
    .then(r => r.json())
    .then(userLogInData => {
      console.log("User creation status: ", userLogInData)
      localStorage.setItem('jwt', userLogInData.token)
      // localStorage.setItem('userID', userLogInData.user.id)
      // localStorage.setItem('username', userLogInData.user.username)
      // console.log("What is this.props from redux store?", this.props)
      this.props.updateUserData(userLogInData)
      this.props.history.push('/homepage')
      document.getElementById("welcomeOverlay").style.display = "block";
    })

  }

  render() {
    return (
      <div className="registration signUp" >
        <h1>Sign up for something sweet!</h1>
        <form onSubmit={this.handleSignUpSubmit}>

          <label>Username: 
            <input name="username" 
              type="text" 
              placeholder="Create a username" 
              onChange={this.handleUsernameChange}>
            </input>
          </label>

          <br></br>

          <label >Password: 
            <input name="password" 
              type="password" 
              placeholder="Create a password" 
              onChange={this.handlePasswordChange}>
            </input>
          </label>

          <br></br>
          
          <input type="submit" value="Lets do something sweet!"></input>
        </form>
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

const mapDispatchToProps = (dispatch) => {
  
  return {
    updateUsername: (newUsername) => {
      dispatch({ type: "UPDATE_USERNAME", username: newUsername })
    },
    updatePassword: (newPassword) => {
      dispatch({ type: "UPDATE_PASSWORD", password: newPassword })
    },
    updateUserData: (newUser) => {
      dispatch({ type: "UPDATE_USERDATA", userData: newUser })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpPage));
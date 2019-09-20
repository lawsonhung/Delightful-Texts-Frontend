import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class SignUpPage extends Component {

  state = {
    username: '',
    password: ''
  }

  handleUsernameChange = (e) => {
    this.setState({[e.target.name]: e.target.value},
      () => {
        console.log(this.state.username)
      })
  }

  handlePasswordChange = (e) => {
    this.setState({[e.target.name]: e.target.value},
      () => {
        console.log(this.state.password)
      })
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "user": {
          "username": this.state.username,
          "password": this.state.password
        }
      })
    })
    .then(r => r.json())
    .then(userLogInData => {
      console.log("Created user: ", userLogInData)
      console.log("Hide this password though! ", this.state.password);
      localStorage.setItem('jwt', userLogInData.jwt)
      this.props.history.push('/homepage')
    })

  }

  render() {
    return (
      <div>
        <h1>Sign up for something sweet!</h1>
        <form onSubmit={this.handleSignUpSubmit}>

          <label>Username: 
            <input name="username" 
              type="text" 
              placeholder="Create a username" 
              onChange={this.handleUsernameChange}>
            </input>
          </label>

          <label >Password: 
            <input name="password" 
              type="text" 
              placeholder="Create a password" 
              onChange={this.handlePasswordChange}>
            </input>
          </label>
          
          <input type="submit" value="Lets do something sweet!"></input>
        </form>
      </div>
    )
  }
}

export default withRouter(SignUpPage);
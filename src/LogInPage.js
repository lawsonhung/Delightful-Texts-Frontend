import React, { Component } from 'react';

class LogInPage extends Component {

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

  handleLogInSubmit = (e) => {
    e.preventDefault()

    // fetch("http://localhost:3000/api/v1/users", {
    //   method: "GET",
    //   headers: {
    //     // How do I access token? localStorage
    //     "Authorization": `Bearer ${local}`
    //   }
    // })
    // .then(r => r.json())
    // .then(data => {
    //   console.log("Log in form submitted")
    //   console.log("Log in status: ", data)
    // })

    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then(userLogInData => {
      console.log("Log in form submitted")
      console.log("Log in status: ", userLogInData)
      // put token in local storage to access profile above when authorizing
      localStorage.setItem('jwt', userLogInData.jwt)
      this.props.history.push('/iceCreamOrder')
    })

  }

  render() {
    return (
      <div>
        <h1>Welcome back! Log in here</h1>
        <form onSubmit={this.handleLogInSubmit}>
          Username: <input name="username" type="text" placeholder="Enter your username" onChange={this.handleUsernameChange}></input>
          Password: <input name="password" type="text" placeholder="Enter your password" onChange={this.handlePasswordChange}></input>
          <input type="submit" value="Sign back in!"></input>
        </form>
      </div>
    )
  }
}

export default LogInPage;
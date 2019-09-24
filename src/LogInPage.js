import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { createStore } from 'redux'

const initialState = { 
  username: 'original store username', 
  password: 'original store password'
}

const reducer = (prevState=initialState, action) => {

  console.log("reducer prevState: ", prevState);
  console.log("reducer action: ", action);

  switch (action.type){
    case "UPDATE_USERNAME":
      return {
        username: action.username,
        password: prevState.password
      }

    case "UPDATE_PASSWORD":
      return {
        username: prevState.username,
        password: action.password
      }

    default:
      return initialState
  }

}

// console.log(createStore)
const store = createStore(reducer)
// debugger

class LogInPage extends Component {

  // state = {
  //   username: '',
  //   password: '',
  // }

  componentDidMount() {
    // !!!!!!!!!!!DON'T USE forceUpdate. Only used for this purpose
    store.subscribe(() => this.forceUpdate())
  }

  handleUsernameChange = (e) => {
    store.dispatch({ type: "UPDATE_USERNAME", username: e.target.value })
    // this.setState({[e.target.name]: e.target.value},
    //   () => {
    //     // console.log(this.state.username)
    //   })
  }

  handlePasswordChange = (e) => {
    store.dispatch({ type: "UPDATE_PASSWORD", password: e.target.value })
    // this.setState({[e.target.name]: e.target.value},
    //   () => {
    //     // console.log(this.state.password)
    //   })
  }

  handleLogInSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        // this.state
        store.getState()
      )
    })
    .then(r => r.json())
    .then(userLogInData => {
      console.log("Log in form submitted")
      console.log("Log in status: ", userLogInData)
      // put token in local storage to access profile above when authorizing
      localStorage.setItem('jwt', userLogInData.jwt)
      localStorage.setItem('userID', userLogInData.user.id)
      console.log("What is this after loggin in? ", this);
      console.log("this.props after loggin in: ", this.props);
      
      this.props.history.push('/homepage')
    })

  }

  render() {
    return (
      <div className="registration" >
        <h1>Welcome back! Log in here</h1>
        <form onSubmit={this.handleLogInSubmit}>

          <label>Username: 
            <input name="username" 
              type="text" 
              placeholder="Enter your username" 
              onChange={this.handleUsernameChange}>
            </input>
          </label>

          <br></br>

          <label>Password: 
            <input name="password" 
              type="text" 
              placeholder="Enter your password" 
              onChange={this.handlePasswordChange}>
            </input>
          </label>

          <br></br>
          
          <input type="submit" value="Sign back in!"></input>
        </form>
      </div>
    )
  }
}

export default withRouter(LogInPage);
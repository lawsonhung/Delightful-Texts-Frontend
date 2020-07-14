import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// const initialState = { 
//   username: 'original store username', 
//   password: 'original store password'
// }

// const reducer = (prevState=initialState, action) => {

//   console.log("reducer prevState: ", prevState);
//   console.log("reducer action: ", action);

//   switch (action.type){
//     case "UPDATE_USERNAME":
//       return {
//         username: action.username,
//         password: prevState.password
//       }

//     case "UPDATE_PASSWORD":
//       return {
//         username: prevState.username,
//         password: action.password
//       }

//     default:
//       return initialState
//   }

// }

// console.log(createStore)
// const store = createStore(reducer)

class LogInPage extends Component {

  // state = {
  //   username: '',
  //   password: '',
  // }

  componentDidMount() {
    // !!!DON'T USE forceUpdate. Only used for this purpose
    // store.subscribe(() => this.forceUpdate())
  }

  handleUsernameChange = (e) => {
    this.props.updateUsername(e.target.value)
    // console.log(this.props.username)
    

    // store.dispatch({ type: "UPDATE_USERNAME", username: e.target.value })

    // this.setState({[e.target.name]: e.target.value},
    //   () => {
    //     // console.log(this.state.username)
    //   })
  }

  handlePasswordChange = (e) => {
    this.props.updatePassword(e.target.value)
    // console.log(this.props.password);
    

    // store.dispatch({ type: "UPDATE_PASSWORD", password: e.target.value })

    // this.setState({[e.target.name]: e.target.value},
    //   () => {
    //     // console.log(this.state.password)
    //   })
  }

  handleLogInSubmit = (e) => {
    e.preventDefault()


    // Local fetch
    // fetch("http://localhost:3000/api/v1/users", {
    
    // Local fetch 2 - rebuilding backend
    fetch("http://localhost:3000/login", {
    
    // Heroku fetch
    // fetch("https://tranquil-castle-49501.herokuapp.com/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.props.username,
        password: this.props.password

        // store.getState()

        // this.state
      })
    })
    .then(r => r.json())
    .then(userLogInData => {
      console.log("Log in status: ", userLogInData);
      // put token in local storage to access profile above when authorizing
      // localStorage.setItem('jwt', userLogInData.jwt)
      // localStorage.setItem('userID', userLogInData.user.id)
      // localStorage.setItem('username', userLogInData.user.username)

      // Rebuilding backend
      localStorage.setItem('jwt', userLogInData.token);
      this.fetchProfile();

      // console.log("this.props after loggin in: ", this.props);
      this.props.updateUserData(userLogInData);
      // console.log("this.props after updating user in redux store: ", this.props);
      
      
      this.props.history.push('/homepage');
      document.getElementById("welcomeOverlay").style.display = "block";
    })

  }

  fetchProfile = () => {
    fetch('http://localhost:3000/profile',{
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`
      }
    })
    .then(r => r.json())
    .then(user => {
      localStorage.userID = user.id;
      localStorage.username = user.username;
    })
  }

  render() {

    // console.log("LogInPage props from redux store: ", this.props);
    // console.log(this.props.username);
    // console.log(this.props.password);
    
    

    return (
      <div className="registration logIn" >
        <h1>Welcome back! Log in here</h1>
        <form onSubmit={this.handleLogInSubmit}>

          <label>Username: 
            <input name="username" 
              type="text" 
              placeholder="Enter your username" 
              onChange={this.handleUsernameChange}>
            </input>
          </label>

          <br/>

          <label>Password: 
            <input name="password" 
              type="password" 
              placeholder="Enter your password" 
              onChange={this.handlePasswordChange}>
            </input>
          </label>

          <br/>
          
          <input type="submit" value="Sign back in!"></input>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogInPage))
const initialState = { 
  username: 'original store username', 
  password: 'original store password',
  userData: 'original store userData'
}

export default (prevState=initialState, action) => {

  // console.log("reducer prevState: ", prevState);
  // console.log("reducer action: ", action);

  switch (action.type){
    case "UPDATE_USERNAME":
      return {
        username: action.username,
        password: prevState.password,
        userData: prevState.userData
      }

    case "UPDATE_PASSWORD":
      return {
        username: prevState.username,
        password: action.password,
        userData: prevState.userData
      }

    case "UPDATE_USERDATA":
      return {
        username: prevState.username,
        password: prevState.password,
        userData: action.userData
      }

    default:
      return initialState
  }

}
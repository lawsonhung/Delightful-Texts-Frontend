const initialState = { 
  username: 'original store username', 
  password: 'original store password'
}

export default (prevState=initialState, action) => {

  // console.log("reducer prevState: ", prevState);
  // console.log("reducer action: ", action);

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
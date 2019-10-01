import React, { Component } from 'react';

class IceCreamOrderPage extends Component {

  state = {
    "flavor": "vanilla",
    "m&ms": false,
    "peanuts": false,
    "sprinkles": false,
    "hot chocolate fudge": false,
    "size": "medium cup",
  }

  renderIceCreamOrders = () => {
    
    fetch("http://localhost:3000/api/v1/profile", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.jwt}`
      }
    })
    .then(r => r.json())
    .then(user => {
      // console.log("localStorage.jwt: ", localStorage.jwt);
      console.log("User data: ", user)
    })

    return(
      <h2>Ice cream orders</h2>
    )
  }

  handleIceCreamOrderChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({ [target.name]: value })
  }

  handleIceCreamOrderSubmit = (e) => {
    e.preventDefault()
    
    console.log("State being sent to fetch post create ice cream: ", this.state)

    // Example body of post request for postman
    // {
    //   "flavor": "Vanilla",
    //   "m_and_ms": false,
    //   "peanuts": false,
    //   "size": "cone",
    //   "sprinkles": false,
    //   "hot_chocolate_fudge": false,
    //   "user_id": localStorage.userID,
    //   "phone_number": "twilio phone number"
    // }

    fetch("http://localhost:3000/api/v1/ice_creams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "flavor": this.state.flavor,
        "m_and_ms": this.state["m&ms"],
        "peanuts": this.state.peanuts,
        "size": this.state.size,
        "sprinkles": this.state.sprinkles,
        "hot_chocolate_fudge": this.state["hot chocolate fudge"],
        "user_id": localStorage.userID,
        "phone_number": "twilio phone number"
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log("What is data after submitting ice cream form?", data)
    })
    
  }

  render() {
    return (
      <div>
        <h1 className="iceCreamOrderFormTitle">I scream, you scream, we all scream for ice cream!</h1>
        {/*this.renderIceCreamOrders()*/}

        <form className="iceCreamOrderForm" onSubmit={this.handleIceCreamOrderSubmit}>
          
          {/*<input className="iceCreamOrderFormSubmitBtn" type="submit" value="this submit button should stay hidden under the header"></input>*/}
          
          <h3 className="formLabel">1. What do you feel like having today?</h3> 
          <select className="iceCreamFormInput" name="flavor" value={this.state.flavor} onChange={this.handleIceCreamOrderChange}>
            <option value="vanilla">Vanilla</option>
            <option value="chocolate">Chocolate</option>
          </select>

          <h3 className="formLabel">2. Choose your toppings!</h3>
          <label><span className="iceCreamFormInput iceCreamFormInputCheckboxLabel">M&M's?</span>
            <input name="m&ms"
              type="checkbox"
              checked={this.state["m&ms"]}
              onChange={this.handleIceCreamOrderChange}
              >
            </input>
          </label>
          <label><span className="iceCreamFormInput iceCreamFormInputCheckboxLabel">Peanuts?</span>
            <input name="peanuts"
              type="checkbox"
              checked={this.state.peanuts}
              onChange={this.handleIceCreamOrderChange}
              >
            </input>
          </label>
          <label><span className="iceCreamFormInput iceCreamFormInputCheckboxLabel">Sprinkles?</span>
            <input name="sprinkles"
              type="checkbox"
              onChange={this.handleIceCreamOrderChange}
              >
            </input>
          </label>

          <h3 className="formLabel">3. Want some <span className="hotChocolateFudge">hot chocolate fudge</span> with that?</h3>
          <label><span className="iceCreamFormInput iceCreamFormInputCheckboxLabel">Hell yeah I do! <span role="img" aria-label="hot chocolate fudge">💩</span></span>
            <input name="hot chocolate fudge"
              type="checkbox"
              onChange={this.handleIceCreamOrderChange}
              >
            </input>
          </label>

          <h3 className="formLabel">4. How much ice cream do you want?</h3>
          <select className="iceCreamFormInput" name="size" value={this.state.size} onChange={this.handleIceCreamOrderChange}>
            <option value="cone">Cone</option>
            <option value="small cup">Small Cup</option>
            <option value="medium cup">Medium Cup</option>
            <option value="large cup">Large Cup</option>
          </select>

          <br/>

          <input className="iceCreamOrderFormSubmitBtn" type="submit" value="Place your order"></input>
          
        </form>
      </div>
    );
  }
}

export default IceCreamOrderPage;
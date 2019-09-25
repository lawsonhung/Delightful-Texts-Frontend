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

    console.log("Ice cream order submitted");
    console.log(this.state);
    
    
  }

  render() {
    return (
      <div>
        <h1>Order ice cream page here</h1>
        {this.renderIceCreamOrders()}

        <form onSubmit={this.handleIceCreamOrderSubmit}>
          <label><h3>Flavor:</h3> 
            <select name="flavor" value={this.state.flavor} onChange={this.handleIceCreamOrderChange}>
              <option value="vanilla">Vanilla</option>
              <option value="chocolate">Chocolate</option>
            </select>
          </label>

          <h3>Toppings:</h3>
          <label>M&M's:
            <input name="m&ms"
              type="checkbox"
              checked={this.state["m&ms"]}
              onChange={this.handleIceCreamOrderChange}
              >
            </input>
          </label>
          <label>Peanuts:
            <input name="peanuts"
              type="checkbox"
              checked={this.state.peanuts}
              onChange={this.handleIceCreamOrderChange}
              >
            </input>
          </label>
          <label>Sprinkles:
            <input name="sprinkles"
              type="checkbox"
              onChange={this.handleIceCreamOrderChange}
              >
            </input>
          </label>

          <h3>Want some hot chocolate fudge with that? <span role="img" aria-label="chocolate bar">🍫</span></h3>
          <label>Hell yeah I do!
            <input name="hot chocolate fudge"
              type="checkbox"
              onChange={this.handleIceCreamOrderChange}
              >
            </input>
          </label>

          <label><h3>Size:</h3>
            <select name="size" value={this.state.size} onChange={this.handleIceCreamOrderChange}>
              <option value="cone">Cone</option>
              <option value="small cup">Small Cup</option>
              <option value="medium cup">Medium Cup</option>
              <option value="large cup">Large Cup</option>
            </select>
          </label>

          <br/>

          <input type="submit" value="Place your order"></input>
          
        </form>
      </div>
    );
  }
}

export default IceCreamOrderPage;
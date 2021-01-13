import React, { Component } from 'react';
import './css/Modal.css';

class ViewIceCreamOrdersPage extends Component {

  editOrder = (order) => {
    console.log(order);
    this.setState({
      modal: document.getElementById(`modal-${order.id}`),
      span: document.getElementsByClassName("close")[0]
    },
    () => {
      // eslint-disable-next-line
      this.state.modal.style.display = "block";
      // console.log(this.state.span);
      // eslint-disable-next-line
      this.state.span.onclick = () => {
        // eslint-disable-next-line
        this.state.modal.style.display = "none";
      }
      window.onclick = (e) => {
        if (e.target === this.state.modal) {
          // eslint-disable-next-line
          this.state.modal.style.display = "none";
        }
      }
    })
  }

  render() {
    // console.log("this.props for ViewiceCreamOrdersPage: ", this.props);

    // setInterval(() => this.fetchAllIceCreamOrders(), 5000)

    return (
      <div>
        <h1 className="iceCreamOrdersTitle"><span className="iceCreamOrdersTitleDevilEmoji" role="img" aria-label="devil">😈</span> We know everything about you... <span className="username">{localStorage.username}</span> <span className="iceCreamOrdersTitleDevilEmoji" role="img" aria-label="devil">😈</span></h1>
        
        {this.props.userIceCreamOrders.map(order => {
          
          return (
            <div key={order.id}>
              <button onClick={() => this.editOrder(order)}>
                <h2 className="orderDescription">
                    <span role="img" aria-label="ice cream">🍦</span> Order {order.id}: A {order.size} of {order.flavor} ice cream
                    {order.m_and_ms || order.peanuts || order.sprinkles ? " topped with " : null}
                    {order.m_and_ms ? "M&M's" : null} {order.peanuts ? "peanuts" : null} {order.sprinkles ? "sprinkles" : null} 
                    {order.hot_chocolate_fudge ? " finished with some hot chocolate fudge" : null} <span role="img" aria-label="ice cream">🍦</span>
                </h2>
              </button>

              <div id={`modal-${order.id}`} class="modal">
                <div class="modal-content">
                  <span class="close">&times;</span>
                  <p>Modal showing up!</p>
                </div>
              </div>

              <br/>
            </div>
            )
          })
        }
      </div>
    );
  }
}

export default ViewIceCreamOrdersPage;
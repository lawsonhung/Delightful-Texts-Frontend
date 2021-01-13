import React, { Component } from 'react';
import './css/Modal.css';

class ViewIceCreamOrdersPage extends Component {

  editOrder = (order) => {
    this.setState({
      modal: document.getElementById(`modal-${order.id}`),
      span: document.getElementsByClassName("close")[0]
    },
    () => {
      this.displayModal();
      this.closeOnCloseClick();
      this.closeOnWindowClick();
    })
  }

  displayModal = () => {
    // eslint-disable-next-line
    this.state.modal.style.display = "block";
  }

  closeOnCloseClick = () => {
    // eslint-disable-next-line
    this.state.span.onclick = () => {
      // eslint-disable-next-line
      this.state.modal.style.display = "none";
    }
  }

  closeOnWindowClick = () => {
    window.onclick = (e) => {
      if (e.target === this.state.modal) {
        // eslint-disable-next-line
        this.state.modal.style.display = "none";
      }
    }
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

              <div id={`modal-${order.id}`} className="modal">
                <h2 className="modal-content">
                  <span className="close">&times;</span>
                  <form>

                    Change your order for order number {order.id}

                    <br/>

                    Flavor:&nbsp;
                    <select value={order.flavor} onChange={() => {}}>
                      <option value="vanilla">Vanilla</option>
                      <option value="chocolate">Chocolate</option>
                    </select>

                    <br/>

                    M&M's:&nbsp;
                    <input type="checkbox"
                    checked={order.m_and_ms}
                    onChange={() => {}} />

                    <br/>

                    Peanuts:&nbsp;
                    <input type="checkbox"
                    checked={order.peanuts}
                    onChange={() => {}} />

                    <br/>

                    Sprinkles:&nbsp;
                    <input type="checkbox"
                    checked={order.sprinkles}
                    onChange={() => {}} />

                    <br/>

                    Hot Chocolate Fudge:&nbsp;
                    <input type="checkbox"
                    checked={order.hot_chocolate_fudge}
                    onChange={() => {}} />

                    <br/>

                    Size:&nbsp;
                    <select value={order.size} onChange={() => {}}>
                      <option value="cone">Cone</option>
                      <option value="small cup">Small Cup</option>
                      <option value="medium cup">Medium Cup</option>
                      <option value="large cup">Large Cup</option>
                    </select>

                    <br/>

                    <input className="iceCreamOrderFormSubmitBtn" type="submit" value="Change your order"></input>
                  </form>
                </h2>
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
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ 1. Calculate total amount for all items
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1));
      total += cost * item.quantity;
    });
    return total.toFixed(2);
  };

  // ✅ 2. Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ✅ 3. Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ✅ 4. Decrement quantity with check
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Remove if quantity would be zero
    }
  };

  // ✅ 5. Remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ 6. Item subtotal
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert('Functionality to be added for future reference')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
// Cart.js
import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { NavLink } from "react-router-dom";
import locker from '../Components/Assets/locker.png';
import line from '../Components/Assets/line.png';
import coupon from '../Components/Assets/coupon.svg';
import linem from '../Components/Assets/linem.png';

// import meine from '../Components/Assets/meine.png';


import "./cart.css"


const Cart = () => {
  const { cartItems, fetchCartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  console.log(useCart());

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, [fetchCartItems]);


  return (
    <div className='cartContainer'>

      <div className="head">
        <h1><NavLink to="/" style={{ textDecoration: 'none', color: '#000', marginLeft: '30px' }} >BEYOUNG<span className="r">R</span></NavLink></h1>
        <div className="secure">
          <img src={locker} alt=""  />
          <h2>100% SECURE PAYMENT</h2>
        </div>
      </div>
      <div className="line">
        <img className='line1' src={line} alt="" />
        <img src={linem} alt="" />
      </div>
      <div className="bothbox">
        <div className="cardbody">
            <ul>
              {cartItems.map((item) => {
                console.log(item);
                return (

                  <li key={item}>
                    <div className="cartdis">
                      <div className="three">
                        <NavLink to={`/productlist/${item._id}`} >
                          <img src={item.displayImage} alt={item.name} width="119px" height="159px" />
                        </NavLink>
                        <p className='three1'>
                          Qty:
                          <button onClick={() =>
                            decreaseQuantity(item.id)
                          }>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() =>
                            increaseQuantity(item.id)
                          }>+</button>
                        </p>
                        <button onClick={() => removeFromCart(item._id)} className="remo">Remove</button>
                      </div>
                      <div className="cartcard">
                        <h3>{item.name}</h3>
                        <p className="category">{item.subCategory}</p>
                        <p className="pri">₹{item.price * item.quantity}</p>
                        <p className="save">
                          You Save <span>₹200</span>
                        </p>
                        <p className="co">
                          COLOR: <span className="colo">{item.color}</span>
                        </p>
                      </div>
                    </div>
                  </li>

                )
              })
              }
            </ul>
          {/* )} */}
        </div>
        <div className="rightbox">
          <div className="offer">
            <div className="off">
              <img src={coupon} alt="" />
              <h3>Offers & Benefits</h3></div>
            <input type="text" placeholder='Enter code' /> <span className='apply'><button >APPLY</button></span>
            <hr />
            <small>Flat ₹100 off on orders above ₹999 -</small>  <span className='hun'>BEYOUNG100</span>
            <hr />
            <p>Show More {'>'}</p>
          </div>
          <div className="pricedetails">
            <h3>PRICE DETAILS</h3>
            <hr />
            <div className="ship">
              <p>Shipping</p>
              <span><strike>₹49</strike>Free</span>
            </div>
            <div className="to">
              <p>Cart Total</p>
              <p>₹{cartItems
                .map((item) => item.price * item.quantity)
                .reduce((total, value) => total + value, 0)}</p>
            </div>
          </div>
          <div className="totalAmount">
            <div className="tot">
              <h3>Total Amount</h3>
              <h3>₹{cartItems
                .map((item) => item.price * item.quantity)
                .reduce((total, value) => total + value, 0)}</h3>
            </div>
            <button>CHECKOUT SECURELY</button>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;

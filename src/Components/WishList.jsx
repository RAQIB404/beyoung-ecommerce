import React from "react";
import { useWishlist, useCart } from "../context/CartContext";
import bag from "../Components/Assets/bag.png";
import wish from "../Components/Assets/wish.png";

import { NavLink } from 'react-router-dom';
import "./wishlist.css";

function WishlistItem({ item }) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      ...item,
      quantity: 1
    });
    removeFromWishlist(item._id);
    console.log(item);
  };

  return (
    <div className="wish">
      <div className="wishlist-item">
        <NavLink to={`/productlist/${item._id}`} >
          <img src={item.displayImage} alt={item.name} width="200px" height="250px" className="wishimg" />
        </NavLink>
        <span className="xb">
          <button onClick={() => removeFromWishlist(item._id)}>X</button>
        </span>
        <div>
          <p>{item.name}</p>
          <p className="category1">{item.subCategory}</p>
          <p className="thirty">₹ {item.price} <span>(30% off)</span></p>
          <button onClick={handleAddToCart} className="bag">
            <img src={bag} alt="" width="15px" height="15px" /> Add to cart
          </button>
        </div>
      </div>

    </div>
  );
}

function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="wishlist-container">
      <div className="sidebar">
        <ul>
          <li>Order</li>
          <li>Address</li>
          <li>
            <NavLink to="/profile" style={{ textDecoration: 'none', color: '#7d7c7c' }}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" style={{ textDecoration: 'none', color: '#7d7c7c' }}>
              Wishlist
            </NavLink>
          </li>
          <li>Coupons</li>
          <li>Tickets</li>
        </ul>
      </div>
      <div>
        {wishlistItems.length === 0 ? (
          <div className="make">
            <div className="makeAWish">
              <img src={wish} alt=""  />
            </div>
          </div>
        ) : (
          <ul>
            {wishlistItems.map((item) => (
              <li key={item._id}>
              <div className="wishlist-item-container">
                <WishlistItem item={item} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Wishlist;

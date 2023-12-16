// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const WishlistContext = createContext(); 

export const CartProvider = ({ children }) => {
  // Load cart items from localStorage on component mount
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Save cart items to localStorage whenever the cartItems state changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

 // Load wishlist items from localStorage on component mount
 const [wishlistItems, setWishlistItems] = useState(() => {
  const storedWishlistItems = localStorage.getItem('wishlistItems');
  return storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
});

 // Save wishlist items to localStorage whenever the wishlistItems state changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item) => {
    setWishlistItems([...wishlistItems, item]);
  };

  const removeFromWishlist = (itemId) => {
    const updatedWishlistItems = wishlistItems.filter((item) => item._id !== itemId);
    setWishlistItems(updatedWishlistItems);
  };

  const getWishlistCount = () => wishlistItems.length;

  
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: updatedCartItems[existingItemIndex].quantity + item.quantity,
      };
      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const removeCartItem = async (itemId) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          // 'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Nzk5YjM4YmQ2NGY3YjI2YThiNzdjMiIsImlhdCI6MTcwMjQ2ODk3NCwiZXhwIjoxNzM0MDA0OTc0fQ.SGNXLnglSu9rwn0Ha4TD7uJNHOb6Dz0_BnWGvKtYYUU',
          'projectId': '12345',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Remove the item from the cart locally
      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const getCartCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/cart', {
        method: 'GET',
        headers: {
          
          'projectId': '12345',
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Update the cart state with the fetched data
      setCartItems(data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem, 
    getCartCount,
    fetchCartItems, 
  };

  const wishlistContextValue = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    getWishlistCount,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <WishlistContext.Provider value={wishlistContextValue}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};

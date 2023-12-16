// cartUtils.js
export const updateCartCount = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = existingCart.length;
    return cartCount;
  };
  
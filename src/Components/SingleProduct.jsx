// SingleProduct
import React, { useState, useEffect } from 'react';
import cart1 from '../Components/Assets/cart1.svg';
import tag from '../Components/Assets/tag.png';
import heart from '../Components/Assets/heart.png'
import { useCart, useWishlist  } from '../context/CartContext';

import "./singleproduct.css";
import { NavLink } from 'react-router-dom';

const SingleProduct = ({ match }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [product, setProduct] = useState({});
  const productId = match.params.productId;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${productId}`, {
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
        setProduct(data.data);
        console.log('Single Product:', data);
      } catch (error) {
        console.error('Error fetching single product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: selectedQuantity });
  };
  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className='container1'>
      <img src={product.displayImage} alt={product.name} />
      <div className='card'>
        <h2>{product.name}</h2>
        <p className='category'>{product.subCategory}</p>
        <p className='pri'> ₹ {product.price}</p>
        <p className='discounted-text'>Inclusive of All Taxes + Free Shipping</p>
        <img className='tag' src={tag} alt='' /> <span className='span'>Extra ₹150 OFF on ₹1499 (Code: BB150)</span>
        <p>COLOR: <span className='colo'>{product.color}</span></p>
        <p>SIZE</p>
        <div className='size-box'>
          <p className='size'>M</p>
          <p className='size'>L</p>
          <p className='size'>XL</p>
          <p className='size'>XXl</p>
        </div>
        <div className="quan">
          <strong>QTY:</strong>
          <select className="quantitybox"  value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
        </div>

        <button className='add' onClick={handleAddToCart}>
        <img src={cart1} alt='' />
        ADD TO CART
      </button>
      </div>
      <NavLink to="/wishlist">
        <div className="heart1" onClick={handleAddToWishlist}>
        <img src={heart} alt="" />
      </div>
      
      </NavLink>
    </div>
  );
};

export default SingleProduct;

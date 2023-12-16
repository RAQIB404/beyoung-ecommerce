import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./products.css"

const ProductList = () => {
    // State variables to store the list of products and loading status
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect is used for side effects in functional components, in this case, fetching data
    useEffect(() => {
        // Inside the useEffect, an asynchronous function fetchProducts is defined
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=100', {
                    method: 'GET',
                    headers: {
                        'projectId': '12345',
                        'Content-Type': 'application/json', // Adjust content type if needed
                    }
                });

                // Check if the response status is okay
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the response JSON data
                const data = await response.json();


                // Update the state with the fetched products and set loading to false
                setProducts(data.data);
                setLoading(false);

                // Log the fetched products to the console
                console.log('Products:', data);

            } catch (error) {
                // Handle errors by logging to the console and setting loading to false
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        // Call the fetchProducts function when the component is mounted
        fetchProducts();
    }, []); // Empty dependency array ensures that the effect runs once after the initial render

    // Display a loading message while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display the list of products once the data is fetched
    return (
        <div className="productList">
            <ul  >
                {products.map((product) => (
                    // Map through the products and display each product's name in a list item
                    <li key={product._id} >
                        <div className='productCard'>
                            <img src={product.displayImage} alt={product.name} className="productImage" />
                            <h4 className="productName">{product.name}</h4>
                            <p className="productPrice">Rs.  {product.price}</p>
                            <NavLink to={`/productlist/${product._id}`} className="buyNow">
                                Buy Now
                            </NavLink>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;




import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "./navbar.css"

import placeholder from '../Components/Assets/placeholder.png'
import cart from '../Components/Assets/cart.png'
import heart from '../Components/Assets/heart.png'
import search from '../Components/Assets/search.png'
import ao from '../Components/Assets/ao.png'
import menu from '../Components/Assets/menu.png'


function Navbar() {
    const { getCartCount } = useCart();
    const location = useLocation();
    const isCartPage = location.pathname === '/cart';

    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showLoginSignup, setShowLoginSignup] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    const handleSearchButtonClick = () => {
        setShowSearchBar(!showSearchBar);
    }

    const handleLoginSignupButtonClick = () => {
        setShowOverlay(!showOverlay);
        if (!showOverlay) {
            setShowLoginSignup(!showLoginSignup);
        }
    }

    const handleOverlayClick = (e) => {
        // Prevent the click event from propagating to the overlay content
        e.stopPropagation();
        if (!showLoginSignup) {
            setShowOverlay(false);
        }
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen); // Step 3
    };


    async function signup() {
        try {

            const response = await fetch(`https://academics.newtonschool.co/api/v1/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectId': '12345',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: Name,
                    appType: 'linkedin',
                }),

            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store the JWT token
                console.log(data);
                setIsLoggedIn(true);
                // Close the form on success
                setShowOverlay(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function login() {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectId': '12345'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    appType: 'linkedin'
                }),

            });
            console.log('Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                console.log('Login successful:', data);
                setIsLoggedIn(true);
                // Close the login popup
                setShowOverlay(false);
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
            }
        } catch (e) {
            console.error('Error during login:', e);
        }
    }

    function logout() {
        localStorage.removeItem('token'); // Remove the stored token
        setIsLoggedIn(false); // Set login status to false
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isSignup) {
            signup()
        } else {
            login()
        }
    }

    function toggleForm() {
        setName("");
        setEmail("");
        setPassword("");
        setIsSignup(!isSignup);

    }

    function closeForm() {
        setShowOverlay(false);
    }

    //    const filterProduct = (cat) => {
    //         const updatedList = data.filter((x) =>x.category === cat);
    //         setFilter(updatedList);
    //    }

    return (
        <div className="container">
            {isCartPage ? null : (
                <div>
                    <div className="free">
                        <p>Free shipping available on all orders. Don't miss out – shop now! </p>
                    </div>

                    <div className="both">
                        <div className="left">
                            <img src={placeholder} alt="" /> <span>TRACK YOUR ORDER</span>
                        </div>
                        <div onClick={handleLoginSignupButtonClick} className="right">
                            {isLoggedIn ? (
                                <a onClick={logout} className="login">LOGOUT</a>
                            ) : (
                                <div>
                                    <a className="login">LOG IN</a>
                                    <a>SIGNUP</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bey">
                        <div className="menu-icon" onClick={handleMenuToggle}>
                            <img src={menu} alt="Menu" />
                        </div>
                        <NavLink to="/" style={{ textDecoration: 'none' }}>
                            <h2>BEYOUNG<span className="r">R</span></h2></NavLink>
                        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                            <ul>
                                <li className="lipro">
                                    <NavLink to="/productlist" style={{ textDecoration: 'none', color: '#000' }} >
                                        MEN
                                    </NavLink>
                                </li>
                                <li className="lipro" >
                                    <NavLink to="/productlist" style={{ textDecoration: 'none', color: '#000' }}>
                                        WOMEN
                                    </NavLink>
                                </li>
                                <li>COMBOS</li>
                                <li>BB KE FAVORITES</li>
                                <li>WINTER WEARS</li>
                                <li>NEW ARRIVALS</li>
                            </ul>
                        </div>
                        <div className="threeimg">
                            <div>
                                <img onClick={handleSearchButtonClick} src={search} alt="" />
                            </div>
                            <div>
                                <NavLink to="/wishlist">
                                    <img src={heart} alt="" />
                                </NavLink>
                                <NavLink to="/cart" className="cart-link">
                                    <img src={cart} alt="" />
                                </NavLink>
                                <sup className="cart-count">{getCartCount()}</sup>

                            </div>
                        </div>
                        {showSearchBar && ( //conditional rendering 
                            <div className="search-box">
                                <button>search</button>
                                <input type="text" placeholder="Search entire store from here..."></input>

                            </div>
                        )}
                    </div>

                    {showOverlay && ( //conditional rendering
                        <div className="overlay" onClick={() => setShowOverlay(false)}>
                            <div className="login-signup" onClick={handleOverlayClick}>
                                <div className="login-img">
                                    <img src={ao} alt="" />
                                    <button title="close (ESC)" className="x" onClick={closeForm}>X</button>
                                </div>
                                <div className="welcome">
                                    Login
                                    <span className="or">or</span>
                                    Signup
                                    <span className="get">Get Exciting Offers & Track Order</span>
                                </div>

                                <div className="place">
                                    <form className="form" onSubmit={handleSubmit}>
                                        {isSignup && <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={Name} required />}
                                        <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} className="em" value={email} required />
                                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="pass" value={password} required />
                                        <button type="submit" className="formButton">{isSignup ? "SignUp" : "Login"}</button>
                                        <p className="toggleForm" onClick={toggleForm}>
                                            {isSignup ? "already have an account? Login" : "Don't have an account? Signup"}
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar;
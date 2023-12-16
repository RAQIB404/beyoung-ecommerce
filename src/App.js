import React, { Component } from 'react';
// import { CartProvider } from 'react-use-cart';

import './App.css';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ProductList from './Components/ProductList';
import SingleProduct from './Components/SingleProduct';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cart from './Components/Cart';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import wishList from './Components/WishList';
import Profile from './Components/Profile';

class App extends Component {

  render() {
    
    return (
      <Router>
       <CartProvider>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/productlist" component={ProductList} />
              <Route exact path="/productlist/:productId" component={SingleProduct}/>
              <Route exact path="/cart" component={Cart} /> 
              <Route exact path="/wishlist" component={wishList} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>
          </CartProvider>
    </Router>
    );
  }
}

export default App;

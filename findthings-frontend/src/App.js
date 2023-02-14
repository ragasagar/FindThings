import './App.css';
import Header from "./Components/Header";
import Login from "./Components/Login";
import { About } from "./Components/About";
import Home from "./Components/Home";
import Buyer from "./Components/Buyer";
import Seller from "./Components/Seller";
import SignBuyer from "./Components/SignBuyer";
import SignSeller from "./Components/SignSeller";
import Feedback from "./Components/Feedback";
import ProductUpdate from "./Components/ProductUpdate";
import BuyerProducts from "./Components/BuyerProducts";
import History from "./Components/History";
import ShowFeedbacks from "./Components/ShowFeedbacks";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from 'react';
import SellerOrder from './Components/SellerOrder';
import Profile from './Components/profile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/buyer' component={Buyer} />
          <Route path='/seller' component={Seller} />
          <Route path='/signupbuyer' component={SignBuyer} />
          <Route path='/signupseller' component={SignSeller} />
          <Route path='/about' component={About} />
          <Route path='/home' component={Home} />
          <Route path='/feedback' component={Feedback} />
          <Route path='/cart' component={BuyerProducts} />
          <Route path='/orders' component={History} />
          <Route path='/showfeedbacks' component={ShowFeedbacks} />
          <Route path='/updateproducts' component={ProductUpdate} />
          <Route path='/sellers/orders' component={SellerOrder} />
          <Route path='/profile' component={Profile} />
        </Switch>

      </BrowserRouter>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
    </>
  );
}

export default App;

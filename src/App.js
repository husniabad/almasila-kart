
import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Register from './Register';

const promise = loadStripe('pk_test_51MeGOxSC6dNQSG02OHWYwhOZnDEBleS55vg5gUP4WhKe0frijL4gywefPKokqsbQQ2nQ3UDKpjJkAlijjiXpUYux00DAvBeB62');

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

      auth.onAuthStateChanged(authUser => {
        console.log("THE USER IS::", authUser);

        if (authUser) {
          // The user just logged in/ was
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        }else{
          // user logout
          dispatch({
            type: 'SET_USER',
            user: null
          })
        }
      })
  }, []);

  return (
    <Router>
      <div className="app">
        
        <Switch>
          <Route path="/orders">
          <Header />
           <Orders  />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

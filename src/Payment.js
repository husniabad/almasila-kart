import React, { useState, useEffect } from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() { 

  const [{basket, user}, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const [paymentType, setPaymentType] = useState('card');


  useEffect(() => {
   //generate the special stripe 
   //secret which allow as to charge customer
    const getClientSecret = async() => {
        try{
            const response = await axios({
            method: "post",
            // Stripe expects the total in a currencies submits
            url:`/payments/create?total=${getBasketTotal(basket) * 100 }`,
            timeout: 5000
        })
        setClientSecret(response.data.clientSecret);
    } catch (error){
        console.log(" you get an error",error)
    }
 }

    getClientSecret();
  }, [basket])

  console.log('THE SECRET IS >>> ', clientSecret);
  console.log("💡💡",user)

  const handleSubmit = async (event) => {
    // stripe
    event.preventDefault();
    setProcessing(true);

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: elements.getElement(CardElement),
          },
      });
      if (payload.error) {
          setError(`Payment failed: ${payload.error.message}`);
          setProcessing(false);
      }else{
    
      // paymentIntent = payment confimation

      db.collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(payload.paymentIntent.id)
      .set({
        basket: basket,
        amount: payload.paymentIntent.amount,
        created: payload.paymentIntent.created,
        payment: "💳"
      });

      
      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: 'EMPTY_BASKET'
      });

      history.replace('/orders')
    }
  }catch(error){
    setError(`Payment failed: ${error.message}`);
  }
};

const handleCashSubmit = async (event) => {
  event.preventDefault();
  setProcessing(true);

  try {
    // Save the order data to the database
    const order = {
      basket: basket,
      amount: getBasketTotal(basket) *100,
      created: Math.floor(new Date().getTime()/1000),
      payment: '💵',
    };
    
    
    const docRef = await 
    db
    .collection('users')
    .doc(user?.uid)
    .collection('orders')
    .add(order);
    
    setSucceeded(true);
    setError(null);
    setProcessing(false);
    
    dispatch({
      type: 'EMPTY_BASKET',
    });
    
    // Redirect the user to the orders page
    history.replace('/orders');
  } catch (error) {
    setError(`Payment failed: ${error.message}`);
  }
};

const handleChange = event => {
  //listen for changes
  //display any errors
  setDisabled(event.empty);
  setError(event.error ? event.error.message : "");
}
// console.log("time is:",Math.floor( new Date().getTime()/1000));

return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>Checkout{': '}({
                <Link to='/checkout'>{basket?.length} items</Link>
                })
            </h1>
            {/* payment section address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 Bangalore street</p>
                    <p>Bengaluru India</p>
                </div>
            </div>

            {/* payment section Review */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items and Delivery</h3>
                </div>
                <div>
                    <div className='payment__items'>
                        {basket.map(item =>(
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* payment section payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__method'>
                  <div className='payment__methodCard'>
                    <div className='payment__methodSelect'>
                      <input type='radio' id='card' name='paymentMethod' value='card' checked={paymentType === 'card'} onChange={() => setPaymentType('card')} />
                      <label htmlFor='card'>Card </label>
                    </div>
                    <div className={`payment__details ${paymentType === 'card' ? 'show' : 'hide'}`}>
                        {/* Stripe */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment_priceContainer'>
                                <CurrencyFormat 
                                    renderText={(value)=>(
                                        <>
                                        <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded || basket.length ===0||!user}>
                                    <span>{!user? <p>please Login first !</p> : (processing ? <p>processing...</p> : "Buy Now")}</span>
                                </button>
                            </div>
                            {/* error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                  </div>
                  <div className='payment__methodCash'>
                    <div className='payment__methodSelect'>
                      <input type='radio' id='cash' name='paymentMethod' value='cash' checked={paymentType === 'cash'} onChange={() => setPaymentType('cash')} />
                      <label htmlFor='cash'>Cash</label>
                    </div>
                    <div className={`payment__details ${paymentType === 'cash' ? 'show' : 'hide'}`}>
                      <br /> <p> {"  "} Please pay cash upon delivery.</p>
                      <CurrencyFormat 
                                    renderText={(value)=>(
                                        <>
                                        <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                      <button onClick={handleCashSubmit} disabled={processing ||  succeeded || basket.length ===0 || !user}>
                          <span>{!user? <p>please log in first</p> : (processing ? <p>processing...</p> : "Buy Now")}</span>
                      </button>
                    </div>
                  </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Payment
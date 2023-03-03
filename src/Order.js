import moment from 'moment/moment';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct';
import './Order.css';

function Order({ order }) {
  return (
    <div className='order'>
        <div className='order__header'>

        <h2>Order No #</h2>
        <p>{moment.unix(order.data.created).format("DD MMMM YYYY, h:mma")}
        </p>
        <p className='order__id'>
         Order ID:<small>{ order.id}</small>
        </p>
        </div>
        {order.data.basket?.map((item) => (
            <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton 
            /> 
            
        ))}
        <CurrencyFormat 
            renderText={(value)=>(
                <>
                <h3 className='order__total'>Order Total: {value}</h3>
                <h3 className='order__paymentMethod'>payment method: {order.data.payment}</h3>
                </>
            )}
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />
    </div>
  )
}

export default Order;

import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';

function 
Subtotal() {
  const ryalPrice = 1;
  const [{basket}, dispatch] = useStateValue();

  const totalPrice = basket.reduce((accumulator, item) => {
    return accumulator + item.price*ryalPrice;
  }, 0);

  return (
    <div className='subtotal'>
        <CurrencyFormat 
        renderText={(value)=>(
            <>
            <p>
                Subtotal({basket?.length} items) :
                <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
                <input type='checkbox' /> This order contains a gift
            </small>
            </>
        )}
        decimalScale={0}
        value={totalPrice}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"YR"}
        />
        <button> Proceed to checkout</button>
    </div>
  )
}

export default Subtotal

import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, image, title, price, rating,hideButton}) {
    const[{basket}, dispatch] = useStateValue();
    const addToBasket = ()=> {
        //dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    const removeFromBasket= () => {
        ///remove item from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' 
        src={image}  
        />

        <div className='checkoutProduct__info'>
            <p className='checkoutProduct__title'>
                {title}
            </p>
            <p className='checkoutProduct__price'>
                <small>$</small><strong>{price}</strong>
            </p>
            <div className='checkoutProduct__rating'>
                {Array(rating)
                .fill()
                .map((_, i)=>(
                    <p>⭐</p> 
                ))}
            </div>
            {/* <button onClick={removeFromBasket}>-</button> */}
            {!hideButton &&(

            <div class="btn-group">
                <button className='checkoutProduct__outerbtn'>

                <button onClick={removeFromBasket}>-</button>
                <button disabled>{basket?.length}</button>
                <button onClick={addToBasket}>+</button>
                </button>
            </div>
            )}
        </div>
    </div>
  )
}

export default CheckoutProduct
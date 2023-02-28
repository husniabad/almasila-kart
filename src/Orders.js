import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import Order from './Order';
import './Orders.css'
import { useStateValue } from './StateProvider';

function Orders() {

    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(user) {

        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot(snapshot =>{
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
          })
          console.log("ther are orders")
    }else{
        setOrders([])
        console.log("NO_ORDERS")
    }
  }, [user])
  console.log(orders);

  return (
    <div className='orders'>
        <h1> your orders</h1>
        <div className='orders__order'>
            {orders?.map(order => (
                <Order order={order} key={order.id} />
            ))}
        </div>
    </div>
  )
}

export default Orders
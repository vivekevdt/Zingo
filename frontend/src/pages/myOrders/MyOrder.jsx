import React, { useContext, useState, useEffect } from 'react'

import "./MyOrder.css"
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrder = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        let intervalId;
    
        if (token) {
            fetchOrders(); // Initial fetch
    
            // Poll every 10 seconds
            intervalId = setInterval(() => {
                fetchOrders();
            }, 1000); // 10000 ms = 10 seconds
        }
    
        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [token]);
    

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.item.map((item, index) => {

                                if (index === order.item.length - 1) {
                                    return item.name + ' x ' + item.quantity
                                }
                                else {
                                    return item.name + ' x ' + item.quantity + ", "
                                }


                            })}</p>
                            <p>Total: ₹{order.amount}.00</p>
                            <p>Items: {order.item.length}</p>
                            <p><span>&#x25cf; </span><b>{order.status}</b></p>
                            <button>Track Order</button>

                    </div>
                ))}
            </div>


        </div>
    )
}

export default MyOrder
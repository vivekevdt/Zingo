import React from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';
import { assets } from '../../assets/assets';

import "./Orders.css"



const Orders = () => {
  const url = "https://zingo-api-vivek.onrender.com";



  const [orders, setOrders] = React.useState([]);


  // Fetch orders from API here.

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);

      }
      else {
        toast.error("Error fetching orders");

      }


    } catch (error) {
      console.error('Error:', error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const status =event.target.value;
    console.log(orderId);
    try {
      const response = await axios.post(`${url}/api/order/status`, { status, orderId });
      if (response.data.success) {
        toast.success("Status updated successfully");
        await fetchOrders();
      }
      else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div className='order add'>
      <h3>
        List of Orders
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.item?.map((item, index) => {
                    if (index === order.item.length - 1) {
                      return item.name + " x " + item.quantity;
                    }
                    else {
                      return item.name + " x " + item.quantity + ", ";

                    }
                  })}
                </p>
                <p className='order-item-name'>
                  {
                    order.address.firstName + " " + order.address.lastName
                  }
                </p>
                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>
                Items: {order.item.length}
              </p>
              <p>
                ₹{order.amount}
              </p>
              <select onChange={(event)=>statusHandler(event,order._id) } value={order.status} >
                <option value="Food Processing">Food Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Preparing">Preparing</option>
                <option value="On the way">On the way</option>
              </select>

            </div>
          ))}
        </div>
      </h3>

    </div>
  )
}


export default Orders
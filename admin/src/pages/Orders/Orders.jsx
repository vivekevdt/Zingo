import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import "./Orders.css";

const Orders = () => {
  const url = "https://zingo-api-vivek.onrender.com";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        status,
        orderId
      });
      if (response.data.success) {
        toast.success("Status updated successfully");
        await fetchOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>List of Orders</h3>

      {/* 🔄 Loader */}
      {loading && (
        <div className="order-loader">
          <p>Loading orders...</p>
        </div>
      )}

      {!loading && (
        <div className="order-list">
          {orders.length === 0 && <p>No orders found</p>}

          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel" />

              <div>
                <p className='order-item-food'>
                  {order.item?.map((item, idx) =>
                    idx === order.item.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>

                <p className='order-item-name'>
                  {order.address.firstName} {order.address.lastName}
                </p>

                <div className='order-item-address'>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},
                    {order.address.country}, {order.address.zipcode}
                  </p>
                </div>

                <p className='order-item-phone'>{order.address.phone}</p>
              </div>

              <p>Items: {order.item.length}</p>
              <p>₹{order.amount}</p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                disabled={loading}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Preparing">Preparing</option>
                <option value="On the way">On the way</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

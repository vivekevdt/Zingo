import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [paymentType, setPaymentType] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (loading || paymentType === "ONLINE") return;

    setLoading(true);

    try {
      const orderItems = [];

      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            ...item,
            quantity: cartItems[item._id],
          });
        }
      });

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 30,
        paymentType: "COD",
      };

      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={placeOrder} className="place-order">
        {/* LEFT SIDE */}
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input
              required
              name="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
            />
            <input
              required
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
            />
          </div>

          <input
            required
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Email Address"
          />

          <input
            required
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            placeholder="Street"
          />

          <div className="multi-fields">
            <input
              required
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              placeholder="City"
            />
            <input
              required
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              placeholder="State"
            />
          </div>

          <div className="multi-fields">
            <input
              required
              name="zipcode"
              value={data.zipcode}
              onChange={onChangeHandler}
              placeholder="Zip Code"
            />
            <input
              required
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              placeholder="Country"
            />
          </div>

          <input
            required
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            placeholder="Phone"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="place-order-right">
          {/* PAYMENT METHOD */}
          <div className="payment-method">
            <h3>Payment Method</h3>

            <div className="payment-options">
              <label
                className={`payment-option ${
                  paymentType === "ONLINE" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentType"
                  value="ONLINE"
                  checked={paymentType === "ONLINE"}
                  onChange={(e) => setPaymentType(e.target.value)}
                />
                <span>💳 Online Payment</span>
              </label>

              {paymentType === "ONLINE" && (
                <p className="payment-info">
                  ⚠️ Online payment is currently not available.  
                  Please choose Cash on Delivery.
                </p>
              )}

              <label
                className={`payment-option ${
                  paymentType === "COD" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentType"
                  value="COD"
                  checked={paymentType === "COD"}
                  onChange={(e) => setPaymentType(e.target.value)}
                />
                <span>💵 Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* CART TOTAL */}
          <div className="cart-total">
            <h2>Cart Total</h2>

            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 30}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 30}
              </b>
            </div>

            <button
              type="submit"
              disabled={
                loading ||
                getTotalCartAmount() === 0 ||
                paymentType === "ONLINE"
              }
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Placing Order...
                </span>
              ) : (
                "PLACE ORDER"
              )}
            </button>
          </div>
        </div>
      </form>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>

            <h2>Order Placed Successfully 🎉</h2>
            <p>Your order has been placed and will be delivered soon.</p>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/myorders");
              }}
            >
              View My Orders
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;

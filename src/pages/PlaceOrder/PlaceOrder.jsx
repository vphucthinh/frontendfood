import React, { useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Constants } from '../../Constant/Constant';
import api from '../../API/api';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    items: [],
    amount: 0,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (["street", "city", "state", "zip", "country"].includes(name)) {
      setData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [name]: value }
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();
  
    let orderItems = [];
    let totalAmount = 0;
  
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = {
          name: item.name,
          quantity: cartItems[item._id],
          price: item.price,
        };
        orderItems.push(itemInfo);
        totalAmount += item.price * cartItems[item._id];
      }
    });
  
    const updatedData = {
      ...data,
      items: orderItems,
      amount: totalAmount,
    };
  
    try {
      console.log("Placing order with data:", updatedData);
  
      const response = await api.post(
        `${Constants.API_URL}${Constants.API_ENDPOINTS.ORDER.PLACE}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      console.log("Order placed successfully:", response);
  
      if (response && response) {
        const { success, session_url } = response;
  
        console.log("Success value:", success);
        console.log("Session URL:", session_url);
  
        if (success && session_url) {
          window.location.href = session_url;
        } else {
          console.error('Unexpected response format:', response);
        }
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response && error.response) {
        console.error('Server error response:', error.response);
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };
  
  
  
  
  
  

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={data.address.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.address.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.address.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zip" onChange={onChangeHandler} value={data.address.zip} type="text" placeholder="Zip code" />
          <input required name="country" onChange={onChangeHandler} value={data.address.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

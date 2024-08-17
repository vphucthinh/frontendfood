import React, { useContext, useEffect, useState } from 'react';
import "./MyOrders.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { Constants } from '../../Constant/Constant';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                `${Constants.API_URL}${Constants.API_ENDPOINTS.ORDER.LIST}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, i) => (
                            i === order.items.length - 1
                                ? `${item.name} x ${item.quantity}`
                                : `${item.name} x ${item.quantity}, `
                        ))}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;

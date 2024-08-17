import React, { useContext, useEffect, useState } from 'react';
import "./MyOrders.css";
import { StoreContext } from '../../context/StoreContext';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import api from '../../API/api.jsx';
import { Constants } from '../../Constant/Constant';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // Decode the token to get the payload (including userId)
    let userId;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.id; // Assuming userId is a field in your token's payload
        console.log("it is from myorder: "+ userId);
    }

    const fetchOrders = async (userId) => {
        try {
            const response = await api.post(
                `${Constants.API_URL}${Constants.API_ENDPOINTS.ORDER.USERORDER}`,
                { userId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            console.log("it is from myorder to get data: "+ response.data);
            setData(response.data);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (token && userId) {
            fetchOrders(userId);
        }
    }, [token, userId]);

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
                        <button onClick={() => fetchOrders(userId)}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;

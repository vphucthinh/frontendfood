import axios from "axios";
import { createContext, useState, useEffect } from "react";
import api from '../API/api';
import { Constants } from "../Constant/Constant";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://backendproject-webanddatabase.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);  
    const [userProfile, setUserProfile] = useState(null);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    
        if (token) {
            try {
                // Log thông tin để kiểm tra
                console.log("Adding item to cart:", { itemId });
    
                const response = await api.post(`${Constants.API_URL}${Constants.API_ENDPOINTS.CART.ADDITEM}`,
                    { itemId: itemId }, // Chú ý kiểm tra cấu trúc của dữ liệu
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                console.log(response);
            } catch (error) {
                console.error('Error to add cart: ', error);
    
                // Nếu có thông báo lỗi từ server, log nó để debug
                if (error.response && error.response.data) {
                    console.error('Server error response:', error.response.data);
                }
            }
        }
    };
    

    const removeFromCart = async (itemId) => {
        if (!cartItems[itemId] || cartItems[itemId] <= 0) {
            console.warn(`Item with id ${itemId} is not in the cart or quantity is zero.`);
            return;
        }
    
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });
    
        if (token) {
            try {
                const response = await api.delete(`${Constants.API_URL}${Constants.API_ENDPOINTS.CART.REMOVEITEM}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    data: { itemId: itemId } 
                });
                console.log(response);
            } catch (error) {
                console.error('Error to remove cart: ', error);
            }
        }
    };
    
    
    
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        try {
            if (!Array.isArray(food_list)) {
                console.warn("Food list is not an array.");
                return totalAmount;
            }
    
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    
                    if (itemInfo && itemInfo.price) {
                        totalAmount += itemInfo.price * cartItems[item];
                    } else {         
                        console.warn(`Item with id ${item} not found in food_list or missing price property.`);
                        continue; 
                    }
                }
            }
        } catch (error) {
            console.error("Error calculating total cart amount:", error);
        }
    
        return totalAmount;
    };
    
    

    const fetchFoodList = async () => {
        const token = sessionStorage.getItem('atoken');
        try {
            const response = await api.get(`${Constants.API_URL}${Constants.API_ENDPOINTS.FOOD.LIST}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            // Log toàn bộ phản hồi từ API để kiểm tra cấu trúc dữ liệu
            console.log("API Response Data:", response.data);
    
            // Kiểm tra nếu response.data và response.data.data là mảng
            if (Array.isArray(response.data.data)) {
                setFoodList(response.data.data);
            } else {
                console.error('Error fetching food items: Data is not an array.');
                console.log("Actual data returned:", response.data.data);
                
                // Nếu không phải là mảng, xử lý sao cho phù hợp
                setFoodList([]); // Hoặc gán giá trị mặc định khác
            }
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };
    
    
    

    const loadCartData = async (token) => {
        try {
            // Log để kiểm tra dữ liệu trước khi gọi API
            console.log("Attempting to add items to cart with data:", cartItems);
    
            const response = await api.post(`${Constants.API_URL}${Constants.API_ENDPOINTS.CART.ADDITEM}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                console.error('Error to add cart: ', response.data.message);
                // Xử lý trường hợp item không tồn tại
                if (response.data.message === 'Item does not exist') {
                    alert("Some items in your cart do not exist. Please check your cart.");
                }
            }
        } catch (error) {
            console.error('Error to add cart: ', error);
        }
    };
    

    const fetchUserProfile = async (token) => {
        try {
            const response = await api.get(`${Constants.API_URL}${Constants.API_ENDPOINTS.PROFILE.USER}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUserProfile(response.data.data);
        } catch (error) {
            console.error('Error to add cart: ', error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const token = sessionStorage.getItem("atoken");
            if (token) {
                setToken(token);
                await loadCartData(token);
                await fetchUserProfile(token);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userProfile,
        fetchUserProfile
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

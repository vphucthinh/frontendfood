import { useContext, useEffect, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import api from '../../API/api';  // Assuming you have an api module for making HTTP requests
import {Constants} from "../../Constant/Constant";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('atoken');
      try {
        const response = await api.get(`${Constants.API_URL}${Constants.API_ENDPOINTS.FOOD.LIST}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodItems.map((item, index) => {
          console.log(category, item.category);
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;

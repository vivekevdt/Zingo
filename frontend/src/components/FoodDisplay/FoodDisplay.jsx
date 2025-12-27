import React, { useContext, useState, useEffect } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import axios from "axios";
import { CircularProgress, Skeleton, Box } from '@mui/material';

const FoodDisplay = ({ category }) => {
  const [loading, setLoading] = useState(true);
  const { food_list } = useContext(StoreContext);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>

      {loading ? (
        // ✅ Loading skeletons
        <div className='skeleton-box'>
          {new Array(4).fill(null).map((_, index) => (
            <React.Fragment key={index}>
              <Box sx={{ pt: 0.5 }}>
              <Skeleton variant="rectangular" width={210} height={118} />

                <Skeleton width="70%" />
                <Skeleton width="50%" />
                <Skeleton width="20%" />
              </Box>
            </React.Fragment>
          ))}

        </div>
      ) : (
        // ✅ Render food items when not loading
        <div className="food-display-list">
          {food_list?.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item?._id}
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
      )}
    </div>
  );
};

export default FoodDisplay;

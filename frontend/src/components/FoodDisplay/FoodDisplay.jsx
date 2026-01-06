import React, { useContext, useState, useEffect } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { Skeleton, Box } from '@mui/material';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  // ✅ Real loading based on food_list
  useEffect(() => {
    if (food_list && food_list.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [food_list]);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>

      {loading ? (
        // ✅ Skeleton while data is loading
        <div className='skeleton-box'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} sx={{ pt: 0.5 }}>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton width="70%" />
              <Skeleton width="50%" />
              <Skeleton width="20%" />
            </Box>
          ))}
        </div>
      ) : (
        // ✅ Render food items after data arrives
        <div className="food-display-list">
          {food_list
            ?.filter(
              item => category === "All" || category === item.category
            )
            .map(item => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;

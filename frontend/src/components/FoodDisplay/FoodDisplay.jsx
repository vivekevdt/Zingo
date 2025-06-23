import React, { useContext, useState, useEffect } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import axios from "axios";

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext)
  // console.log(food_list);
  // food_list.forEach((item) => {
  //   console.log(item.name);
  // });

  food_list.map((item, index) => {
    if (category === "All" || category === item.category) {

      // console.log(item._id);
      // console.log(item.name);
      // console.log(item.price);
      // console.log(item.description);
      // console.log(index);

      // return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
      // )   
    }
  })




  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            )
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
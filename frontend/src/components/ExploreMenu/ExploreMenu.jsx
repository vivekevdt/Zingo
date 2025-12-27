import React from 'react'
import {menu_list} from "../../assets/assets"
import "./ExoloreMenu.css"

const ExploreMenu = ({category,setCategory}) => {

    let handleClick=(item)=>{
        setCategory(
            category===item.menu_name?"All":item.menu_name
        )
    }
    
  return (
    <div className='explore-menu' id="explore-menu">
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Indulge in a culinary adventure with our mouth-watering dishes, delivered hot and fresh right to your doorstep. Experience gourmet flavors, exclusive deals, and lightning-fast delivery—Order now from Zingo and savor the best meals in town! </p>
        <div className='explore-menu-list'>
            {
                menu_list.map((item,index)=>(
                    <div onClick={()=>(handleClick(item))} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>      
                ))
            }
        </div>
        <hr/>

    </div>
  )
}

export default ExploreMenu
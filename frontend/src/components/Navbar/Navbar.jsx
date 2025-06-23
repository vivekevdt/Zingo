import React, { useState,useContext, useEffect } from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { ToastContainer,toast } from "react-toastify"



const Navbar = ({setshowLoginPopup}) => {
    const{cartItems,setCartItems,getTotalCartAmount,token,setToken}=useContext(StoreContext);

    const [menu,setMenu]=useState("home")

    const navigate=useNavigate();

    const logout = ()=>{
        localStorage.removeItem("token");
        setToken("")
        setCartItems({})
        navigate("/")
        toast.success("Successfully Logged out", {
            position: "top-center",
            autoClose: 2000
        });
    }
    const orders = ()=>{

        navigate("/myorders")

    }

    let handleClick=(value)=>{
        setMenu(value)
    }




  return (
    <div className='navbar'>
       <Link to="/"> <h1 className='logo'  src={assets.logo} alt="" >Zingo</h1></Link>
        <ul className='navbar-menu'>
            <Link to="/" onClick={()=>{handleClick("home")}} className={menu==="home"?"active":""}>Home</Link>
            <a href="#explore-menu" onClick={()=>{handleClick("menu")}} className={menu==="menu"?"active":""}>Menu</a>
            <a href="#app-download"onClick={()=>{handleClick("mobile-app")}} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
            <a href="#footer" onClick={()=>{handleClick("contact-us")}} className={menu==="contact-us"?"active":""}>Contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt="" />
            <div className='navbar-search-icon'>
                <Link to ="/cart"><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()!==0?"dot":""}></div>   
            </div>
            {!token?<button onClick={()=>(setshowLoginPopup(true))}>Sign in</button>
            : <div className='navbar-profile'>
                <h3></h3>
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile-dropdown'>
                    <li><img src={assets.bag_icon} alt="" /><p onClick={orders}>Orders</p></li>
                    <hr/>
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
              </div>
            }
        </div>
    </div>
  )
}

export default Navbar
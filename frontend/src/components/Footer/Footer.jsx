import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                {/* <img src={assets.logo} alt="" /> */}
                <h1>
                    Zingo
                </h1>
                <p>Welcome to Zingo, your ultimate food delivery platform! Created by Vivek Kunar, a passionate Master of Computer Applications student from National Institute of Technology, Raipur, Zingo is designed to make your dining experience seamless and delightful. Our mission is to connect you with your favorite meals from top-rated restaurants, ensuring quality, convenience, and speed. Whether you’re craving a quick bite or a gourmet feast, Zingo brings deliciousness right to your doorstep with just a few clicks. Thank you for choosing Zingo – we’re here to make every meal special!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@Zingo</li>
                </ul>
            </div>
        </div>
        <p className='footer-copyright'>Copyright 2024 @ Zingo.com -All Right Reserved</p>
     </div>
  )
}

export default Footer
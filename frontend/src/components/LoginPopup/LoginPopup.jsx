import React, { useContext, useState } from 'react';

import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import "./LoginPopup.css"
import axios from 'axios';


const LoginPopup = ({ setshowLoginPopup }) => {
    const { url, setToken, loadCartData, setCartItems } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Signup");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading]= useState(false);
     

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let newUrl = url;
        if (currState === "Login") {
            newUrl = newUrl + "/api/user/login";
        } else {
            newUrl = newUrl + "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                await loadCartData(response.data.token);
                setshowLoginPopup(false);
                setIsLoading(false);

                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 2000
                });
            } else {
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 2000
                });
            }
        } catch (error) {
            console.log("axios not connected")

            toast.error("An error occurred. Please try again.", {
                position: "top-center",
                autoClose: 2000
            });
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => (setshowLoginPopup(false))} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {
                        currState === "Signup" ? <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : null
                    }
                    <input onChange={onChangeHandler} value={data.email} name="email" type="email" placeholder='Your email' required />
                    <input onChange={onChangeHandler} value={data.password} name="password" type="password" placeholder='password' required />
                </div>
                <button type="submit">{isLoading?(<CircularProgress size="20px" color="inherit" />):currState === "Signup" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {
                    currState === "Signup" ? <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                        : <p>Create a new account? <span onClick={() => setCurrState("Signup")}>Click here</span></p>
                }
            </form>
        </div>
    );
}

export default LoginPopup;

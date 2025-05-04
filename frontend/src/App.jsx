import Navbar from "./components/Navbar/Navbar"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import React, { useContext,useState } from "react";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from "./context/StoreContext"
import Footer from "./components/Footer/Footer"
import Verify from "./pages/verify/verify"
import MyOrder from "./pages/myOrders/MyOrder"

function App() {

  const [showLoginPopup, setshowLoginPopup] = useState(false);
  const {nightMode} = useContext(StoreContext) 


  return (

    <>
    <ToastContainer/>
    {showLoginPopup&&<LoginPopup setshowLoginPopup={setshowLoginPopup}/>}
    <div className={nightMode?"app nightactive":"app"}>
      <Navbar setshowLoginPopup={setshowLoginPopup}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart></Cart>} />
        <Route path="/order" element={<PlaceOrder></PlaceOrder>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/myorders" element={<MyOrder/>} />
      </Routes>
    </div>
    <Footer/>
    </>

  
  )
}

export default App

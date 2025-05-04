import { createContext, useEffect, useSyncExternalStore } from "react";
import { useState } from "react";
import axios from "axios";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{


    const [cartItems, setCartItems]=useState({});

    const [token, setToken]=useState("");

    const[food_list,setFoodList] =useState([]);
    
    const[nightMode,setNightMode]=useState(false);

    const url ="http://localhost:4000"

    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems({...cartItems,[itemId]:1})
        }
        else{
            setCartItems({...cartItems,[itemId]:cartItems[itemId]+1})
        }
        if(token){  //to store in cart item in users account using token
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }

    }

    const removeFromCart= async (itemId)=>{
        setCartItems({...cartItems,[itemId]:cartItems[itemId]-1})
        if(token){  //to  remove  cart item in users account using token
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

     
    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
      
    }
 



    const getTotalCartAmount=()=>{
        let totalamount=0;
        for(const item in cartItems)
        {
            let itemInfo=food_list.find((product)=>product._id===item);
            totalamount=totalamount+itemInfo.price*cartItems[item];

        }
        return totalamount;
    }



    const fetchFoodList= async()=>{
      const response = await axios.get(`${url}/api/food/list`)
      if(response.data.success){
        setFoodList(response.data.data); 
      }
      else{
        toast.error("Error");
      }
    }
 

    useEffect(()=>{

        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                
                await loadCartData(localStorage.getItem("token"));
            }
            
        }
        loadData();
        // if(!token){
        //     setCartItems({})
        // }


    },[])



    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,setToken,
        url,
        loadCartData,
        nightMode,
        setNightMode

        
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
            <>{token}</>
        </StoreContext.Provider>

    )
}

export default StoreContextProvider;


import React, { useEffect, useState } from 'react'
import "./List.css"
import { assets } from '../../assets/assets'
import axios from "axios";
import { toast } from 'react-toastify';


const List = () => {

  const url="http://localhost:4000";
  const [List, setList]=useState([]);

  const fetchList= async()=>{
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data); 
    }
    else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  const removeHandler= async(foodid)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodid})
    if(response.data.success){
      toast.success(response.data.message)
      fetchList();
    }
    else{

      toast.error("Error");
    }
  }

  return (
    <div className='list-add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item,index)=>{
          return (
            <div key="index" className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeHandler(item._id)} className="remove-btn">X</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default List
import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "https://zingo-api-vivek.onrender.com";

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeHandler = async (foodId) => {
    if (deletingId) return;

    setDeletingId(foodId);
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="list-add flex-col">
      <p>All Foods List</p>

      {/* 🔄 Loader */}
      {loading && (
        <div className="list-loader">
          <p>Loading food list...</p>
        </div>
      )}

      {!loading && (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.length === 0 ? (
            <p className="empty-text">No food items found</p>
          ) : (
            list.map((item) => (
              <div key={item._id} className="list-table-format">
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>

                <p
                  className={`remove-btn ${
                    deletingId === item._id ? "disabled" : ""
                  }`}
                  onClick={() =>
                    deletingId !== item._id && removeHandler(item._id)
                  }
                >
                  {deletingId === item._id ? "..." : "X"}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default List;

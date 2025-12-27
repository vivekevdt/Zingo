

import Order from "../models/orderModel.js";
import Food from "../models/foodModel.js";
import User from "../models/userModel.js";

export async function searchFoodByName({ name }) {
  const foods = await Food.find({ name: { $regex: name, $options: "i" } });
  return foods.map(f => ({
    id: f._id,
    name: f.name,
    price: f.price,
    category: f.category,
  }));
}

export async function showCart(userId) {
  const user = await User.findById(userId);
  console.log(user)
  if (!user || !user.cartData) return [];

  const foodIds = Object.keys(user.cartData);

  const foods = await Food.find({ _id: { $in: foodIds } });




  return foods.map(f => {
    const qty = user.cartData[f._id];
    return {
      name: f.name,
      qty,
      price: f.price,
      total: qty * f.price,
    };
  });
}


export async function addToCart(userId, { foodName, quantity = 1 }) {
  const food = await Food.findOne({
    name: { $regex: foodName, $options: "i" },
  });

  if (!food) return { error: "Food not found" };

  const user = await User.findById(userId);
  if (!user) return { error: "User not found" };

  const cart = user.cartData || {};

  const foodId = food._id.toString();

  cart[foodId] = (cart[foodId] || 0) + quantity;

  user.cartData = cart;
  user.markModified("cartData");
  await user.save();
  console.log(user);

  return {
    message: `${food.name} added to cart`,
    name: food.name,
    qty: cart[foodId],
  };
}

export async function getOrderStatus(userId, { orderId }) {
  const order = orderId
    ? await Order.findOne({ _id: orderId, userId })
    : await Order.findOne({ userId }).sort({ createdAt: -1 });

  if (!order) return { error: "No order found" };

  return { orderId: order._id,items: order.item, status: order.status, total: order.amount };
}

export async function getMyOrders(userId) {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).limit(5);
  return orders.map(o => ({
    orderId: o._id,
    status: o.status,
    total: o.totalAmount,
    date: o.createdAt,
  }));
}

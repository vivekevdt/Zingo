export const tools = [
  {
    name: "searchFoodByName",
    description: "Search food items by name or keyword",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
  },
  {
    name: "showCart",
    description: "Get current user's cart items",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "addToCart",
    description: "Add a food item to cart",
    parameters: {
      type: "object",
      properties: {
        foodName: { type: "string" },
        quantity: { type: "number" },
      },
      required: ["foodName"],
    },
  },
  {
    name: "getOrderStatus",
    description: "Get status of user's order",
    parameters: {
      type: "object",
      properties: {
        orderId: { type: "string" },
      },
    },
  },
  {
    name: "getMyOrders",
    description: "Get user's past orders",
    parameters: { type: "object", properties: {} },
  },
];

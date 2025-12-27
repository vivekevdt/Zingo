import { ai, MODEL_NAME } from "../chatbotConfig/gemini.js";
import {
  searchFoodByName,
  showCart,
  addToCart,
  getOrderStatus,
  getMyOrders,
} from "../chatbotConfig/toolHandler.js";

// In-memory history
const chatHistory = new Map();

const SYSTEM_PROMPT = `
You are a food ordering assistant.
You must reply ONLY in valid JSON.
If user wants to:
- search food → { "tool": "searchFoodByName", "name": "..." }
- add to cart → { "tool": "addToCart", "foodName": "...", "quantity": 1 }
- show cart → { "tool": "showCart" }
- order status → { "tool": "getOrderStatus", "orderId": "" }
-Never reply in plain text.

- order history → { "tool": "getMyOrders" }
If no tool is needed:
{ "tool": "none", "reply": "your reply text" }
Do not add anything outside JSON.
`;

export const getUserHistory = (userId) => {
  if (!chatHistory.has(userId)) {
    chatHistory.set(userId, [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    ]);
  }
  return chatHistory.get(userId);
};

export const askGemini = async (history) => {
  const result = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: history.slice(-10),
  });

  const text = result.candidates[0].content.parts
    .map((p) => p.text || "")
    .join("")
    .trim();

  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // 👇 Fallback when model breaks JSON
    return {
      tool: "none",
      reply: text,
    };
  }
};


export const runTool = async (parsed, userId) => {
  switch (parsed.tool) {
    case "searchFoodByName":
      return searchFoodByName({ name: parsed.name });

    case "showCart":
      return showCart(userId);

    case "addToCart":
      return addToCart(userId, {
        foodName: parsed.foodName,
        quantity: parsed.quantity || 1,
      });

    case "getOrderStatus":
      return getOrderStatus(userId, { orderId: parsed.orderId });

    case "getMyOrders":
      return getMyOrders(userId);

    default:
      return null;
  }
};

export const formatReply = (parsed, toolResult) => {
  if (toolResult?.error) return `❌ ${toolResult.error}`;

  switch (parsed.tool) {
    case "addToCart":
      return `✅ ${toolResult.message} (Qty: ${toolResult.qty})`;

    case "showCart":
      if (!toolResult?.length) return "🛒 Your cart is empty.";
      return (
        "🛒 Your cart contains:\n" +
        toolResult
          .map((i) => `• ${i.name} x${i.qty} — ₹${i.total}`)
          .join("\n")
      );

    case "searchFoodByName":
      if (!toolResult?.length) return "❌ No matching food found.";
      return (
        "🍽️ I found these items:\n" +
        toolResult
          .map((f) => `• ${f.name} (${f.category}) — ₹${f.price}`)
          .join("\n")
      );

    case "getOrderStatus":
      return `📦 Order ${toolResult.orderId}\nStatus: ${toolResult.status}\nTotal: ₹${toolResult.total}`;

    case "getMyOrders":
      if (!toolResult?.length) return "📭 You have no previous orders.";
      return (
        "🧾 Your recent orders:\n" +
        toolResult
          .map((o) => `• ${o.orderId} — ${o.status} — ₹${o.total}`)
          .join("\n")
      );

    default:
      return parsed.reply || "Okay!";
  }
};

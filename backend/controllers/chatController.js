import jwt from "jsonwebtoken";
import {
  getUserHistory,
  askGemini,
  runTool,
  formatReply,
} from "./chatHelpers.js";

import {formatWithGemini} from "./formatWithGemini.js";





const PROTECTED_TOOLS = new Set([
  "showCart",
  "addToCart",
  "getOrderStatus",
  "getMyOrders",
]);

export const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    let userId = null;

    // 🔎 If token exists, try decoding (for history or protected tools)
    const { token } = req.headers;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        userId = decoded.id; // 👈 extract from token
      } catch {
        // don't block yet – only block if protected tool is used
        userId = null;
      }
    }

    // For guests, use a temp id for chat history
    const historyUserId = userId || req.ip;

    const history = getUserHistory(historyUserId);
    history.push({ role: "user", parts: [{ text: message }] });

    const parsed = await askGemini(history);

    // 🔐 If tool needs auth but no valid userId → block
    if (PROTECTED_TOOLS.has(parsed.tool)) {
      if (!userId) {
        return res.status(401).json({
          success: false,
          reply: "🔒 Please login to use cart and order features.",
        });
      }
    }

    // 👉 Always pass real userId to protected tools
    const toolUserId = userId || historyUserId;

    const toolResult = await runTool(parsed, toolUserId);

    const markdownReply = await formatWithGemini(parsed.tool, toolResult);

    history.push({
      role: "model",
      parts: [{ text: markdownReply }],
    });

    return res.json({
      success: true,
      reply: markdownReply, // 👈 Markdown
      raw: toolResult, // optional (debug / UI logic)
    });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ success: false, error: "Chat failed" });
  }
};

//to decode the token sended by user
import dotenv from "dotenv";

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ sucees: false, message: "Not authorized login again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;

import express from "express";


import { chatController } from "../controllers/chatController.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();


router.post("/",chatController);

export default router;

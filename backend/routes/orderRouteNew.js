import express, { Router } from "express"

import { placeOrder, verifyOrder,userOrders ,listOrders,updateOrderStatus } from "../controllers/orderController"

import authMiddleware from "../middleware/auth"

const router = express.Router()

router.post("/place",authMiddleware,placeOrder)
router.post("/verify",authMiddleware,verifyOrder)
router.post("/userOrders",authMiddleware,userOrders)
router.get("/list",authMiddleware,listOrders)
router.post("/statusUpdate",authMiddleware,updateOrderStatus)


export default router;
 
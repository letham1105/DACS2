import express from "express";
import { createOrder, getOrderHistory } from "../controllers/order.controller.js";

const router = express.Router();

// Tạo đơn hàng
router.post("/", createOrder);

// Lấy lịch sử đơn hàng
router.get("/:userId", getOrderHistory);

export default router;

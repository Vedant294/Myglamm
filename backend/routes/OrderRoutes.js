import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyRevenue,
  getCategorySales,
  updateOrderStatus,
} from "../controller/OrderController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import adminMiddleware from "../middleware/AdminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getUserOrders);
router.get("/admin", adminMiddleware, getAllOrders);
router.put("/admin/:orderId/status", adminMiddleware, updateOrderStatus);
router.get("/monthly-revenue", adminMiddleware, getMonthlyRevenue);
router.get("/category-sales", adminMiddleware, getCategorySales);

export default router;

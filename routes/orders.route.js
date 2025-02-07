const express = require("express");
const ordersController = require("../controllers/orders.controller");

const router = express.Router();

// Get user's orders
router.get("/", ordersController.getOrders);

// Create a new order
router.post("/", ordersController.addOrder);

// Update order status (admin only)
router.patch("/:id", ordersController.updateOrderStatus);

module.exports = router;

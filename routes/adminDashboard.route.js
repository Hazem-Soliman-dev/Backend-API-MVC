const express = require("express");

const router = express.Router();

router.get("/users", (req, res) => {
  // Get all users (admin only)
  res.json("users");
});

router.get("/orders", (req, res) => {
  // Get all orders (admin only)
  res.json("orders");
});

router.get("/analytics", (req, res) => {
  // Get sales analytics (admin only)
  res.json("analytics");
});

module.exports = router;

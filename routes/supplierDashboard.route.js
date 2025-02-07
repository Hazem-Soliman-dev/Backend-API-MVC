const express = require("express");

const router = express.Router();

router.get("/products", (req, res) => {
  // Get products added by the supplier
  res.json("Supplier products");
});

router.get("/orders", (req, res) => {
  // Get orders related to the supplier's products
  res.json("Supplier orders");
});

module.exports = router;

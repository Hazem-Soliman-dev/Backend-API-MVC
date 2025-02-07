const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  // Get user's cart
  res.json("cart");
});

router.post("/", (req, res) => {
  // Add product to cart
  res.json(req.body);
});

router.patch("/:id", (req, res) => {
  // Update product quantity in cart
  res.json({ message: `Updating product ${req.params.id}`, data: req.body });
});

router.delete("/:id", (req, res) => {
  // Remove product from cart
  res.json({ message: `Deleting product ${req.params.id}` });
});

module.exports = router;

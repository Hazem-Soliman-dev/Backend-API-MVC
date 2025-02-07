const express = require("express");
const productsController = require("../controllers/products.controller");

const router = express.Router();

// Get all products (with filters and pagination)
router.get("/", productsController.getProducts);

// Get product details by ID
router.get("/:id", productsController.getProduct);

// Add a new product (admin/supplier only)
router.post("/", productsController.addProduct);

// Update a product (admin/supplier only)
router.patch("/:id", productsController.updateProduct);

// Delete a product (admin only) - soft delete
router.delete("/:id", productsController.deleteProduct);

module.exports = router;

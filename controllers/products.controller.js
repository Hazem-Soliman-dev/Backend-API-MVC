const Product = require("../models/product.model");
const mongoose = require("mongoose");

exports.getProducts = async (req, res) => {
	const { page = 1, limit = 10, sortBy = "createdAt", order = "desc", ...query } = req.query;
	const skip = (page - 1) * limit;

	try {
		const products = await Product.find({ $and: [query, { status: 'active' }] }, null, { sort: { [sortBy]: order === "asc" ? 1 : -1 }, lean: true }).skip(skip).limit(limit).lean().exec();
		if (!products.length) return res.status(404).json({ error: "Products not found" });

		res.json({ data: products });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getProduct = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid product ID" });

	try {
		const product = await Product.findOne({ _id: id, status: { $ne: "deleted" } }).lean().exec();
		return product ? res.json({ data: product }) : res.status(404).json({ error: "Product not found" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.addProduct = async (req, res) => {
	const requiredFields = ["name", "category", "price", "quantity"];
	const missingFields = requiredFields.filter(field => !req.body[field]);

	if (missingFields.length) {
		return res.status(400).json({ error: "Missing required fields", message: `The following fields are required and cannot be empty: ${missingFields.join(", ")}` });
	}

	try {
		const product = await Product.create(req.body);
		return res.status(201).json({ message: "Product added successfully", data: product });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.updateProduct = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid product ID" });

	try {
		const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true, lean: true, fields: Object.keys(req.body), Projection: { _id: 0 } });
		if (!product) return res.status(404).json({ error: "Product not found" });


		res.status(200).json({ message: `Product ${id} updated successfully`, updated: true, data: product });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteProduct = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid product ID" });

	try {
		const result = await Product.updateOne({ _id: id, status: { $ne: "deleted" } }, { status: "deleted" });
		if (result.nModified === 0) return res.status(404).json({ error: "Product not found or already deleted" });

		res.status(200).json({ message: `Product ${id} deleted successfully`, deleted: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

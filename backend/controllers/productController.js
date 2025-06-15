import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.js';

export const addProduct = async (req, res) => {
  try {
    if (!req.body.productData || !req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Missing data or images" });
    }

    const productData = JSON.parse(req.body.productData);
    const files = req.files;

    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imageUrls });

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Product List Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.error("Get Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
    console.error("Stock Update Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

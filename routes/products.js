const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');

const multer = require('multer');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'astore-products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
});

const upload = multer({ storage });

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST (add new product)
router.post('/', upload.single('image'), async (req, res) => {
    console.log("POST /products reached");
    console.log(req.body);
    console.log(req.file);

    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            subDescription: req.body.subDescription,
            category: req.body.category,
            externalLink: req.body.externalLink,
            imageUrl: req.file ? req.file.path : ""
        });

        await newProduct.save();
        res.json(newProduct);

    } catch (err) {
        console.error("UPLOAD ERROR:", err);
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
});

// UPDATE a product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// DELETE a product
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted', deleted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
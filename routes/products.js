const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
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
    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            subDescription: req.body.subDescription,
            category: req.body.category,
            externalLink: req.body.externalLink,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : ""
        });

        await newProduct.save();
        res.json(newProduct);

    } catch (err) {
        res.status(500).json({ message: err.message });
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
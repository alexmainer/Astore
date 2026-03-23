const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


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
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        subDescription: req.body.subDescription,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        externalLink: req.body.externalLink
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
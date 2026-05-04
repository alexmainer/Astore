const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


// GET all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST (add new category)
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// DELETE a category
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted', deleted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
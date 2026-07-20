// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },         // Product name (main title)
    description: { type: String, required: true }, // Main description
    subDescription: String,                         // Secondary description (optional)
    imageUrl: { type: String, required: true },    // Product image URL
    category: String,                               // Category name
    externalLink: { type: String, required: true },// Clickable card link
    createdAt: { type: Date, default: Date.now }   // Date added
});

module.exports = mongoose.model('Product', productSchema);
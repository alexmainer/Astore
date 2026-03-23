const mongoose = require('mongoose');

// Define the structure of a category
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Category name (must be unique)
    description: String,                                   // Optional description
    createdAt: { type: Date, default: Date.now }          // Timestamp when category was added
});

// Export the model
module.exports = mongoose.model('Category', categorySchema);
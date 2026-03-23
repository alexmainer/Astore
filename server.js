// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection (replace with your URI)
mongoose.connect('mongodb://127.0.0.1:27017/astore', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Astore Server is running!');
});

// THIS IS THE KEY: listen to a port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const productRoutes = require('./routes/products');
console.log(productRoutes);
app.use('/products', productRoutes);
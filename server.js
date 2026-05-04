// server.js
const multer = require('multer');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

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
const categoryRoutes = require('./routes/categories');
app.use('/categories', categoryRoutes);


app.use(express.static(path.join(__dirname)));
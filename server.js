// server.js
require('dotenv').config();


const multer = require('multer');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: "https://alexmainer.github.io",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false
}));

const PORT = process.env.PORT || 3000;

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

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Atlas connected!'))
    .catch(err => console.log('MongoDB connection error:', err));
// Sample route
app.get('/', (req, res) => {
    res.send('Astore Server is running!');
});

// THIS IS THE KEY: listen to a port

const productRoutes = require('./routes/products');
console.log(productRoutes);
app.use('/products', productRoutes);
const categoryRoutes = require('./routes/categories');
app.use('/categories', categoryRoutes);


app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
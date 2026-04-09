const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes Implementation
app.use('/api/auth', require('./routes/auth'));
app.use('/api/waste', require('./routes/waste'));
app.use('/api/admin', require('./routes/admin'));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecoearn';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✓ Connected to MongoDB');
        app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('✗ MongoDB connection error:', err.message);
        console.log('TIP: Make sure MongoDB is installed and running locally, or update MONGO_URI in .env');
    });

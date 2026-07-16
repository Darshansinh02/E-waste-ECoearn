const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Inject socket server in request object
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes Implementation
app.use('/api/auth', require('./routes/auth'));
app.use('/api/waste', require('./routes/waste'));
app.use('/api/admin', require('./routes/admin'));

// Socket.io Connection Logic
io.on('connection', (socket) => {
    socket.on('register-user', (email) => {
        if (email) {
            socket.join(email);
        }
    });
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecoearn';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✓ Connected to MongoDB');
        server.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('✗ MongoDB connection error:', err.message);
        console.log('TIP: Make sure MongoDB is installed and running locally, or update MONGO_URI in .env');
    });

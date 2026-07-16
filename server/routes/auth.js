const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretcode', { expiresIn: '1d' });
        
        res.json({ token, user: { email: user.email, profileComplete: user.profileComplete, isAdmin: user.isAdmin } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const auth = require('../middleware/auth');

// Update Profile
router.post('/profile', auth, async (req, res) => {
    try {
        const { email, username, birthdate, address, photoData } = req.body;
        
        // Prevent editing someone else's profile
        if (req.user.email !== email) {
            return res.status(403).json({ message: 'Access denied: Profile email mismatch' });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { username, birthdate, address, photoData, profileComplete: true },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get User Data
router.get('/user/:email', auth, async (req, res) => {
    try {
        // Prevent accessing someone else's data unless admin
        if (req.user.email !== req.params.email && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Unauthorized user query' });
        }

        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

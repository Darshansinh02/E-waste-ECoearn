const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const User = require('../models/User');
const Redemption = require('../models/Redemption');
const auth = require('../middleware/auth');

// Submit Waste
router.post('/submit', auth, async (req, res) => {
    try {
        const { email, wasteType, quantity, condition, description, collectionMethod, collectionAddress, pickupDate, pickupTime, ewastePhoto, pointsEarned } = req.body;
        
        // Ensure they only submit for their own account
        if (req.user.email !== email) {
            return res.status(403).json({ message: 'Access denied: Cannot submit waste for another user' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const submission = new Submission({
            user: user._id,
            wasteType,
            quantity,
            condition,
            description,
            collectionMethod,
            collectionAddress,
            pickupDate,
            pickupTime,
            ewastePhoto,
            pointsEarned
        });

        await submission.save();

        res.status(201).json({ submission, totalPoints: user.totalPoints });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Submissions
router.get('/submissions/:email', auth, async (req, res) => {
    try {
        // Ensure they only query their own submissions (or admin)
        if (req.user.email !== req.params.email && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Unauthorized submissions query' });
        }

        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const submissions = await Submission.find({ user: user._id }).sort({ submittedAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Redeem Reward
router.post('/redeem', auth, async (req, res) => {
    try {
        const { email, rewardName, points, shippingAddress, phoneNumber } = req.body;
        
        // Ensure they only redeem for their own account
        if (req.user.email !== email) {
            return res.status(403).json({ message: 'Access denied: Cannot redeem rewards for another user' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.totalPoints < points) {
            return res.status(400).json({ message: 'Not enough points' });
        }

        if (!shippingAddress || !phoneNumber) {
            return res.status(400).json({ message: 'Shipping address and phone number are required' });
        }

        user.totalPoints -= points;
        await user.save();

        const redemptionCode = 'ECO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const redemption = new Redemption({
            user: user._id,
            rewardName,
            pointsSpent: points,
            redemptionCode,
            shippingAddress,
            phoneNumber
        });

        await redemption.save();

        res.json({ message: 'Reward redeemed successfully', redemption, totalPoints: user.totalPoints });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Redemptions
router.get('/redemptions/:email', auth, async (req, res) => {
    try {
        // Ensure they only query their own redemptions (or admin)
        if (req.user.email !== req.params.email && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Unauthorized redemptions query' });
        }

        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const redemptions = await Redemption.find({ user: user._id }).sort({ redeemedAt: -1 });
        res.json(redemptions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const User = require('../models/User');

// Submit Waste
router.post('/submit', async (req, res) => {
    try {
        const { email, ...submissionData } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const submission = new Submission({
            user: user._id,
            ...submissionData
        });

        await submission.save();

        // Update user points
        user.totalPoints += submissionData.pointsEarned;
        await user.save();

        res.status(201).json({ submission, totalPoints: user.totalPoints });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Submissions
router.get('/submissions/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const submissions = await Submission.find({ user: user._id }).sort({ submittedAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

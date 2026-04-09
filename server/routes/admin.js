const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Middleware to check if user is admin (simplified for demo)
const checkAdmin = async (req, res, next) => {
    // In a real app, this should decode JWT and check role.
    // We'll trust the payload for this demo or find user by email.
    const userEmail = req.headers['admin-email'];
    if (!userEmail) return res.status(403).json({ message: 'Unauthorized' });

    const user = await User.findOne({ email: userEmail });
    if (!user || (!user.isAdmin && userEmail !== 'admin@ecoearn.com')) {
        return res.status(403).json({ message: 'Unauthorized, admin only.' });
    }
    next();
};

// Get all submissions
router.get('/submissions', checkAdmin, async (req, res) => {
    try {
        const submissions = await Submission.find().populate('user', 'email username').sort({ submittedAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Verify/Reject submission
router.post('/verify', checkAdmin, async (req, res) => {
    try {
        const { submissionId, action } = req.body; // action: 'approve' or 'reject'
        
        const submission = await Submission.findById(submissionId);
        if (!submission) return res.status(404).json({ message: 'Submission not found' });
        if (submission.status !== 'pending') return res.status(400).json({ message: 'Already processed' });

        if (action === 'approve') {
            submission.status = 'verified';
            // Find user and add points
            const user = await User.findById(submission.user);
            if (user) {
                user.totalPoints += submission.pointsEarned;
                await user.save();

                // Create Notification
                const notification = new Notification({
                    user: user._id,
                    message: `Congratulations! Your ${submission.wasteType} submission was verified. You earned ${submission.pointsEarned} points!`,
                    type: 'points_earned'
                });
                await notification.save();
            }
        } else if (action === 'reject') {
            submission.status = 'rejected';
            
            // Create Notification
            const notification = new Notification({
                user: submission.user,
                message: `Sorry, your ${submission.wasteType} submission was rejected. Please contact support for details.`,
                type: 'system'
            });
            await notification.save();
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        await submission.save();
        res.json({ message: `Submission ${action}d successfully.`, submission });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Setup admin user helper
router.post('/setup-admin', async (req, res) => {
    try {
        let user = await User.findOne({ email: 'admin@ecoearn.com' });
        if (!user) {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            user = new User({ 
                email: 'admin@ecoearn.com', 
                password: hashedPassword, 
                isAdmin: true,
                profileComplete: true,
                username: 'Admin'
            });
            await user.save();
        } else {
            user.isAdmin = true;
            await user.save();
        }
        res.json({ message: 'Admin setup complete. You can login with admin@ecoearn.com / admin123' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/stats', checkAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const submissions = await Submission.find();
        
        const totalSubmissions = submissions.length;
        const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
        const verifiedSubmissions = submissions.filter(s => s.status === 'verified').length;
        const totalWeight = submissions.filter(s => s.status === 'verified').reduce((sum, s) => sum + s.quantity, 0);

        res.json({
            totalUsers,
            totalSubmissions,
            pendingSubmissions,
            verifiedSubmissions,
            totalWeight: totalWeight.toFixed(2)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User routes (could be moved to a separate file, but kept here for simplicity)
// Get user notifications
router.get('/my-notifications/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const notifications = await Notification.find({ user: user._id }).sort({ createdAt: -1 }).limit(10);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mark all as read
router.post('/read-notifications/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        await Notification.updateMany({ user: user._id, isRead: false }, { isRead: true });
        res.json({ message: 'Notifications marked as read' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

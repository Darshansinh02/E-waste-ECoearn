const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Submission = require('./models/Submission');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecoearn';

async function viewDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('\n--- ♻ ECOEARN DATABASE SUMMARY ---\n');

        // Fetch Users
        const users = await User.find();
        console.log(`👤 USERS (${users.length}):`);
        users.forEach(u => {
            console.log(` - ${u.email} | Username: ${u.username || 'N/A'} | Points: ${u.totalPoints}`);
        });

        // Fetch Submissions
        console.log('\n📦 SUBMISSIONS:');
        const subs = await Submission.find().populate('user', 'email');
        subs.forEach(s => {
            console.log(` - [${s.status.toUpperCase()}] ${s.wasteType} (${s.quantity}kg) from ${s.user ? s.user.email : 'Unknown'}`);
        });

        console.log('\n----------------------------------');
        process.exit();
    } catch (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1);
    }
}

viewDatabase();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecoearn';

async function setupAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✓ Connected to MongoDB');

        const adminEmail = 'admin@ecoearn.com';
        const adminPassword = 'admin123';

        let admin = await User.findOne({ email: adminEmail });
        
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        if (!admin) {
            admin = new User({
                email: adminEmail,
                password: hashedPassword,
                username: 'Admin',
                isAdmin: true,
                profileComplete: true,
                totalPoints: 0
            });
            await admin.save();
            console.log('\n✓ ADMIN ACCOUNT CREATED SUCCESSFULLY!');
        } else {
            admin.isAdmin = true;
            admin.password = hashedPassword;
            await admin.save();
            console.log('\n✓ ADMIN ACCOUNT UPDATED/RESET SUCCESSFULLY!');
        }

        console.log(`\nCREDENTIALS:`);
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log('\n----------------------------------');
        
        process.exit(0);
    } catch (err) {
        console.error('✗ Error setting up admin:', err.message);
        process.exit(1);
    }
}

setupAdmin();

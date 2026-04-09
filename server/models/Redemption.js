const mongoose = require('mongoose');

const RedemptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rewardName: { type: String, required: true },
    pointsSpent: { type: Number, required: true },
    redemptionCode: { type: String, required: true },
    status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
    shippingAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    trackingNumber: { type: String },
    redeemedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Redemption', RedemptionSchema);

const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wasteType: { type: String, required: true },
    quantity: { type: Number, required: true },
    condition: { type: String, required: true },
    description: { type: String },
    collectionMethod: { type: String, required: true },
    collectionAddress: { type: String },
    ewastePhoto: { type: String },
    pointsEarned: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', SubmissionSchema);

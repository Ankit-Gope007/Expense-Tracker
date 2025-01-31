import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
    {
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        categories: [{
            category: {
                type: String,
                required: true,
            },
            allocatedAmount: {
                type: Number,
                required: true,
            },
        }],
    }
    , { timestamps: true });
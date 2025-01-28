import mongoose, { Schema } from "mongoose";
import dayjs from "dayjs";

const expenseSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Other'],
            default: 'Other',
        },
        date: {
            type: Date,
            default: new Date().toISOString().split('T')[0],
        },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Credit Card', 'UPI', 'Other'],
            default: 'Other',
        },
        notes: {
            type: String,
        },

    }, { timestamps: true });


export const Expense = mongoose.model('Expense', expenseSchema);
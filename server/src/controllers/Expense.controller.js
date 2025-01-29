import { Expense } from "../models/Expense.model.js";
import { Profile } from "../models/Profile.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dayjs from "dayjs";

export const createExpense = asyncHandler(async (req, res) => {
    const {title, amount, category, date, paymentMethod, notes} = req.body;
    const expense = await Expense.create({profile:req.profile._id, title, amount, category, date, paymentMethod, notes});
    return res
    .status(201)
    .json(new ApiResponse(201, {expense}, "Expense created successfully"));
});

export const getExpenseByCategory = asyncHandler(async (req, res) => {
    const {category} = req.body;
    const expenses = await Expense.find({category, profile:req.profile._id});
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return res
    .status(200)
    .json(new ApiResponse(200, {expenses},{total}, `Expenses By Categorie Named ${category} fetched successfully`));
});

export const getExpenseByDate = asyncHandler(async (req, res) => {
    const {date} = req.body;
    const expenses = await Expense.find({date, profile:req.profile._id});
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return res
    .status(200)
    .json(new ApiResponse(200, {expenses},{total}, `Expenses By Date Named ${date} fetched successfully`));
});

export const getExpenseByPaymentMethod = asyncHandler(async (req, res) => {
    const {paymentMethod} = req.body;
    const expenses = await Expense.find({paymentMethod, profile:req.profile._id});
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return res
    .status(200)
    .json(new ApiResponse(200, {expenses},{total}, `Expenses By Payment Method Named ${paymentMethod} fetched successfully`));
});

export const getExpenseByProfile = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({profile:req.profile._id});
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return res
    .status(200)
    .json(new ApiResponse(200, {expenses},{total}, `Expenses By Profile fetched successfully`));
});

export const updateExpense = asyncHandler(async (req, res) => {
    
    const {expenseId,title, amount, category, date, paymentMethod, notes} = req.body;
    const expense = await Expense.findById(expenseId);
  
    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {title, amount, category, date, paymentMethod, notes}, {new:true});
    console.log(updatedExpense);
    return res
    .status(200)
    .json(new ApiResponse(200, {updatedExpense}, "Expense updated successfully"));
});

export const deleteExpense = asyncHandler(async (req, res) => {
    const {expenseId} = req.body;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }
    await Expense.findByIdAndDelete(expenseId);
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Expense deleted successfully"));
});

export const getExpenseByMonth = asyncHandler(async (req, res) => {
    const { month } = req.body; 
    const expenses = await Expense.find({ profile: req.profile._id }); 


    const filteredExpenses = expenses.filter(expense => {
        return dayjs(expense.date).month() === parseInt(month, 10)
    });

  
    if (filteredExpenses.length === 0) {
        return res.status(404).json(new ApiResponse(404, {}, "No expenses found for this month"));
    }

   
    const total = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);

    
    return res.status(200).json(
        new ApiResponse(
            200,
            { filteredExpenses, total },
            `Expenses for month ${month} fetched successfully`
        )
    );
});

export const getExpenseById = asyncHandler(async (req, res) => {
    const {expenseId} = req.body;
    console.log(expenseId);
    const expense = await Expense.findById(expenseId);
    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }
    return res.status(200).json(new ApiResponse(200, { expense }, "Expense fetched successfully"));
});

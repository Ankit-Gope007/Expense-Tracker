import { Router } from "express";
import {
    createExpense,
    getExpenseByCategory,
    getExpenseByDate,
    getExpenseByPaymentMethod,
    getExpenseByProfile,
    updateExpense,
    deleteExpense,
    getExpenseByMonth,
    getExpenseById
} from "../controllers/Expense.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT,createExpense);
router.route("/category").post(verifyJWT,getExpenseByCategory);
router.route("/date").post(verifyJWT,getExpenseByDate);
router.route("/paymentMethod").post(verifyJWT,getExpenseByPaymentMethod);
router.route("/user").get(verifyJWT,getExpenseByProfile);
router.route("/update").patch(verifyJWT,updateExpense);
router.route("/delete").post(deleteExpense);
router.route("/month").post(verifyJWT,getExpenseByMonth);
router.route("/expense").post(verifyJWT,getExpenseById);


export default router
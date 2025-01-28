import { Router } from "express";
import {
    createExpense,
    getExpenseByCategory,
    getExpenseByDate,
    getExpenseByPaymentMethod,
    getExpenseByUser,
    updateExpense,
    deleteExpense,
    getExpenseByMonth
} from "../controllers/Expense.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT,createExpense);
router.route("/category").post(verifyJWT,getExpenseByCategory);
router.route("/date").post(verifyJWT,getExpenseByDate);
router.route("/paymentMethod").post(verifyJWT,getExpenseByPaymentMethod);
router.route("/user").get(verifyJWT,getExpenseByUser);
router.route("/update").patch(verifyJWT,updateExpense);
router.route("/delete").delete(verifyJWT,deleteExpense);
router.route("/month").post(verifyJWT,getExpenseByMonth);


export default router
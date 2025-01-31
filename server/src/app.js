import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true,
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended:true,limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import profileRouter from "./routes/Profile.route.js"
import expenseRouter from "./routes/Expense.route.js"

// routes declaration

app.use("/api/v1/profile",profileRouter)
app.use("/api/v1/expense",expenseRouter)

export {app}
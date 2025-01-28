import { Router } from "express";
import {
    registerUser,
    loginUser,
    getCurrentUserProfile,
    logoutUser,
} from "../controllers/User.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/me").get(verifyJWT,getCurrentUserProfile);


export default router
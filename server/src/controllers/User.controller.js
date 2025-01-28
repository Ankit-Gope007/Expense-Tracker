import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while genrating access and refresh token")
    }
}




export const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body
    const userExists = await User.find({ email })
    if (userExists.length > 0) {
        throw new ApiError(400, "User already exists")
    }
    const user = await User.create({ email, password,name})


    // const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    return res
    .status(201)
    .json(new ApiResponse(201, { user },"User created successfully"))
    
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly:true,
        secure:true,
    }
    

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200, {user},"User logged in successfully"))

});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const _id = req.user._id
    const user = await User.findById(_id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, {user},"User profile fetched successfully"))
});



export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200 , {} , "User Logged Out"))
});


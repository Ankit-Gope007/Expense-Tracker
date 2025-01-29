import { Profile } from "../models/Profile.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const generateAccessAndRefreshToken = async (profileId) => {
    try {
        const profile = await Profile.findById(profileId)
        const accessToken = profile.generateAccessToken()
        const refreshToken = profile.generateRefreshToken()
        profile.refreshToken=refreshToken
        await profile.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while genrating access and refresh token")
    }
}




export const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body
    const profileExists = await Profile.find({ email })
    if (profileExists.length > 0) {
        throw new ApiError(400, "Profile already exists")
    }
    const profile = await Profile.create({ email, password,name})

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(profile._id)

    const options = {
        httpOnly:true,
        secure:true,
    }
    // const {accessToken,refreshToken} = await generateAccessAndRefreshToken(profile._id)

    return res
    .status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(201, { profile },"Profile created successfully"))
    
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const profile = await Profile.findOne({email})
    if (!profile) {
        throw new ApiError(404, "Profile not found")
    }
    const isPasswordValid = await profile.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(profile._id)

    const options = {
        httpOnly:true,
        secure:true,
    }
    

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200, {profile},"Profile logged in successfully"))

});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const _id = req.profile._id
    const profile = await Profile.findById(_id)
    if (!profile) {
        throw new ApiError(404, "Profile not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, {profile},"Profile profile fetched successfully"))
});



export const logoutUser = asyncHandler(async (req, res) => {
    await Profile.findByIdAndUpdate(
        req.profile._id,
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
    .json(new ApiResponse(200 , {} , "Profile Logged Out"))
});


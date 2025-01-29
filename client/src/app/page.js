"use client"
import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import axios from 'axios'
import {
    LOGIN_ROUTE,
    SIGNUP_ROUTE,
} from '@/apiRoutes.js'
import { useRouter } from 'next/navigation'


const page = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const validateSignUp = () => {
        if (!name.length) {
            toast.error("Name is required")
            return false
        }
        if (!email.length) {
            toast.error("Email is required")
            return false
        }
        if (!password.length) {
            toast.error("Password is required")
            return false
        }
        if (confirmPassword !== password) {
            toast.error("Password does not match")
            return false
        }
        return true
    }

    const validateLogin = () => {
        if (!email.length) {
            toast.error("Email is required")
            return false
        }
        if (!password.length) {
            toast.error("Password is required")
            return false
        }
        return true
    }

    const handleSignUp = async () => {
        if (validateSignUp()) {
            try {
                const response = await axios.post(SIGNUP_ROUTE, { name, email, password }, { withCredentials: true })
                toast.success("Sign Up successfully")
                router.push("/home")
            } catch (error) {
                toast.error("Something went wrong")
            }
    
        }

    }

    const handleLogin = async () => {
        if (validateLogin()) {
            try {
                const response = await axios.post(LOGIN_ROUTE, { email, password }, { withCredentials: true })
                router.push("/home")
                toast.success("Logged In successfully")
                
            } catch (error) {
                // console.log(error)
                toast.error("Invalid Credentials")
            }

        }
    }



    return (
        <>
            <div className='flex  justify-center items-center w-full h-full'>
                <div className='w-[50%] ml-20 hidden md:block'>
                    <img className='h-[700px] w-[700px]' src="https://media.istockphoto.com/id/1214054918/vector/budget-management-app-personal-financial-control-cash-flow-tiny-woman-manages-the-personal.jpg?s=612x612&w=0&k=20&c=kPffn0lXROiTyEdrzXRNSb5bsnatjJgldNC4NAcAeWo=" alt="logo" />
                </div>
                <div className='w-[45%] mt-[50%] mr-[150px] md:mt-0 md:mr-0 '>
                    <Tabs defaultValue="account" className="w-[350px] md:w-[400px] shadow-xl ">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="account">Login</TabsTrigger>
                            <TabsTrigger value="password">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Login</CardTitle>
                                    <CardDescription>
                                        If you already have an account, Login here 😆
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="email"
                                            placeholder="Email"
                                            type="email"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="password"
                                            placeholder="Password"
                                            type="password"
                                        />
                                    </div>

                                </CardContent>
                                <CardFooter className="   flex flex-col justify-center items-center">
                                    <Button
                                        onClick={handleLogin}
                                        className="w-full shadow-lg"
                                    >Login</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sign Up</CardTitle>
                                    <CardDescription>
                                        If you don't have an account, Sign Up here 😃
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="Email"
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            placeholder="Password"
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            id="confirmPassword"
                                            placeholder="Confirm Password"
                                            type="password"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="   flex flex-col justify-center items-center">
                                    <Button 
                                    className="w-full shadow-lg"
                                    onClick={handleSignUp}
                                    >Sign Up</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </>
    )
}

export default page
// src="https://img.lovepik.com/element/45012/6232.png_860.png"
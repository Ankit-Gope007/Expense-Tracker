"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    GET_PROFILE_ROUTE,
    GET_EXPENSES_ROUTE,
    ADD_EXPENSE_ROUTE

} from '@/apiRoutes.js'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ExpenseCard from '../components/ExpenseCard'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation'
import Loader from '../components/Loader/loader'
import { toast } from 'sonner'

const page = () => {

    const [name, setName] = useState('')
    const [totalSpent, setTotalSpent] = useState(0)
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([])
    const router = useRouter()

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        
        try {
            const response = await axios.get(GET_PROFILE_ROUTE, { withCredentials: true })
            setName(response.data.data.profile.name.split(' ')[0])
            const exp_response = await axios.get(GET_EXPENSES_ROUTE, { withCredentials: true })
            setTotalSpent(exp_response.data.message.total)
            setExpenses(exp_response.data.data.expenses)
          } catch (error) {
            toast.error("Unauthorized Actions Detected Please login to continue")
            router.push('/')
          }

    }
    const handleAddExpense = () => {
        router.push('/home')
    }
    const handleMonth = () => {
        router.push('/month')
    }
    const handleLatestExpense = () => {
        router.push('/latestExpense')
    }

    return (
        <>
            {
                loading ? <Loader /> :
                    <div className='h-[100vh] min-w-max flex justify-center items-center '>
                        <div className='h-[650px] w-[1200px] bg-slate-50  rounded-2xl shadow-xl flex justify-center items-center '>
                            <div className='h-[90%]  w-[40%] '>
                                <h1 className='text-6xl font-extrabold'>Hello, {name}</h1>
                                <div className='bg-gray-600 h-[200px] w-[90%] rounded-3xl mt-5 text-white p-10'>
                                    <h1 className='text-lg font-bold mb-5'>Total Spent :</h1>
                                    <h1 className='text-5xl font-bold'>₹ {totalSpent}</h1>
                                </div>
                                <div className='flex-col  flex-wrap mt-5'>
                                    {/* <div className='bg-gray-300 text-white font-bold cursor-pointer text-xl hover:bg-gray-400 m-2 h-[90px] w-[43%] rounded-xl flex justify-center items-center'>By category</div> */}
                                    <div className='bg-gray-300 text-white font-bold cursor-pointer text-xl hover:bg-gray-400 m-2 h-[90px] w-[90%] rounded-xl flex justify-center items-center'
                                        onClick={handleLatestExpense}
                                    >Latest expense</div>
                                    {/* <div 
              onClick={handleMonth}
              className='bg-gray-300 text-white font-bold cursor-pointer text-xl hover:bg-gray-400 m-2 h-[90px] w-[43%] rounded-xl flex justify-center items-center'>By month</div> */}
                                    <div
                                        onClick={handleAddExpense}
                                        className='bg-gray-300 text-white font-bold cursor-pointer text-xl hover:bg-gray-400 m-2 h-[90px] w-[90%] rounded-xl flex justify-center items-center'>Add Expense</div>

                                </div>
                            </div>
                            <div className='h-[90%] bg-gray-200 shadow-xl w-[55%] rounded-xl'>
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-6xl m-2 font-extralight'>Latest Expense</h1>
                                    <div className='w-[90%] h-[100%]'>
                                        <ScrollArea className="h-[500px] w-full rounded-md border">
                                            {
                                                [...expenses].reverse().map(expense => (
                                                    <ExpenseCard key={expense._id} expense={expense} />
                                                ))
                                            }

                                        </ScrollArea>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default page
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
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

const page = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [totalSpent, setTotalSpent] = useState(0)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    paymentMethod: "",
    category: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(ADD_EXPENSE_ROUTE, formData, { withCredentials: true })
    console.log(response.data.data.expense)
    setFormData({
      title: "",
      amount: "",
      date: "",
      paymentMethod: "",
      category: "",
      notes: "",
    });
    if (response.status === 201) {
      toast.success("Expense added successfully")
    }
  }

  useEffect( () => {
     getProfile()
  }, [])

  const getProfile = async () => {
    const response = await axios.get(GET_PROFILE_ROUTE, { withCredentials: true })
    setName(response.data.data.profile.name.split(' ')[0])
    console.log(response.data.data.profile.name.split(' ')[0])
    const exp_response = await axios.get(GET_EXPENSES_ROUTE, { withCredentials: true })
    setTotalSpent(exp_response.data.message.total)

  }
  const handleLatestExpense = () => {
    router.push('/latestExpense')
  }
  const handleAddExpense = () => {
    router.push('/home')
  }
  const handleMonth = () => {
    router.push('/month')
  }

  return (
    <>
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
              <h1 className='text-6xl m-2 font-extralight'>Add a New Expense</h1>
              <div className='w-[90%] h-[100%]'>
                <Card>
                  <form action="">
                    <CardContent className="mt-5">
                      <h1 className='font-bold text-xl'>Title</h1>
                      <Input 
                      className="Title"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                       />
                    </CardContent>
                    <CardContent className="mt-5 flex gap-5 ">
                      <div className='w-1/2'>
                        <h1 className='font-bold text-xl'>Amount</h1>
                        <Input
                          className=" w-full"
                          type="number"
                          name="amount"
                          onChange={handleChange}
                          value={formData.amount}
                        />
                      </div>
                      <div className='w-1/2'>
                        <h1 className='font-bold text-xl'>Date</h1>
                        <Input
                          className="Amount w-full"
                          type="date"
                          name="date"
                          onChange={handleChange}
                          value={formData.date}
                        />
                      </div>
                    </CardContent>
                    <CardContent className="mt-5 flex gap-5 ">
                      <div className='w-1/2'>
                        <h1 className='font-bold text-xl'>Payment Method</h1>
                        <Select 
                        onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Methods</SelectLabel>
                              <SelectItem value="Cash">Cash</SelectItem>
                              <SelectItem value="Credit Card">Credit Card</SelectItem>
                              <SelectItem value="UPI">UPI</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='w-1/2'>
                        <h1 className='font-bold text-xl'>Category</h1>
                        <Select
                          onValueChange={(value) => setFormData({ ...formData, category:value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              <SelectItem value="Food">Food</SelectItem>
                              <SelectItem value="Transportation">Transportation</SelectItem>
                              <SelectItem value="Bills">Bills</SelectItem>
                              <SelectItem value="Shopping">Shopping</SelectItem>
                              <SelectItem value="Entertainment">Entertainment</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>

                    <CardContent className="mt-0">
                      <h1 className='font-bold text-xl'>Note</h1>
                      <Input
                       className="Note" 
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                       />
                    </CardContent>

                    <CardFooter>
                      <Button 
                      className="w-full rounded-xl"
                      onClick={handleSubmit}
                      >Add Expense</Button>
                    </CardFooter>
                  </form>

                </Card>

              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
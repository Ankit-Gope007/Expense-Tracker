"use client"
import React from 'react'
import { MdEdit,MdDelete } from "react-icons/md";
import { DELETE_EXPENSE_ROUTE, UPDATE_EXPENSE_ROUTE } from '@/apiRoutes';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import axios from 'axios'

const ExpenseCard = ({expense}) => {
  const router = useRouter();
  const Id = expense._id
  
  const handleEdit = () => {
    router.push(`/edit/${Id}`);
  };
  const handleDelete = async() => {
      console.log(expense._id)
      const response = await axios.post(DELETE_EXPENSE_ROUTE,{expenseId:expense._id})

      if(response.status === 200){
        window.location.reload()
        setTimeout(() => {toast.success("Expense deleted successfully")}, 2000);
        
      }

  };
  return (
    <div className='bg-gray-100 w-[90%] rounded-xl  h-[100px] shadow-xl m-5  flex justify-between'>
      <div className='m-1 ml-4'>
        <h1 className='text-xl font-bold'>{expense.title}</h1>
        <h1 className='text-lg font-bold'>₹{expense.amount}</h1>
        <h1 className='text-sm text-gray-500 font-bold'>{expense.date.split('T')[0]}</h1>
      </div>
      <div className=' flex items-center mr-[70px] gap-5 '>
        <MdEdit onClick={handleEdit} className='text-4xl text-gray-500 cursor-pointer' />
    
        <MdDelete onClick={handleDelete} className='text-4xl text-gray-500 cursor-pointer' />
      </div>

    </div>
  )
}

export default ExpenseCard
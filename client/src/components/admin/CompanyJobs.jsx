import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/Hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const CompanyJobs = () => {
  useGetAllAdminJobs()
    const navigate = useNavigate();
    const [input, setInput] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])
  return (
    <>
        <Navbar/>
        <h1 className='text-3xl font-bold ml-32 mt-4'>Companies</h1>
        <div className='max-w-6xl mx-auto my-20'>
            <div className='flex items-center justify-between my-5 '>
                <Input className="w-fit" placeholder="Filter by name, role" onChange= {(e) => setInput(e.target.value)}/>
                <Button onClick = {() => navigate("/admin/jobs/create")}
                className="bg-black text-white hover:bg-black rounded-xl">New Jobs</Button>
            </div>
            <AdminJobsTable/>
        </div>
    </>
  )
}

export default CompanyJobs
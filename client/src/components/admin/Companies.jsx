import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useGetAllCompanies from '@/Hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies()
    const navigate = useNavigate();
    const [input, setInput] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])
  return (
    <>
        <Navbar/>
        <h1 className='text-3xl font-bold ml-32 mt-4'>Companies</h1>
        <div className='max-w-6xl mx-auto my-20'>
            <div className='flex items-center justify-between my-5 '>
                <Input className="w-fit" placeholder="Filter by name" onChange= {(e) => setInput(e.target.value)}/>
                <Button onClick = {() => navigate("/admin/companies/create")}
                className="bg-black text-white hover:bg-black rounded-xl">New company</Button>
            </div>
            <CompaniesTable/>
        </div>
    </>
  )
}

export default Companies
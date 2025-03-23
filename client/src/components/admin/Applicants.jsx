import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            // console.log("Fetching applicants...");

            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {withCredentials: true})
                // console.log("Applicants job:", res.data);
                dispatch(setAllApplicants(res.data.job))
            } catch (error) {
                console.log(error); 
            }
        }
        fetchAllApplicants();
    }, [])
  return (
    <>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length}) </h1>
            <ApplicantsTable/>
        </div> 
    </>
  )
}

export default Applicants
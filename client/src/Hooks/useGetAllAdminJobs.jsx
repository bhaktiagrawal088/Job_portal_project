import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice'
import { useEffect } from 'react'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {withCredentials:true})
            if(res.data.success){
                // console.log("fetched jobs:",res.data.jobs)
                dispatch(setAllAdminJobs(res.data.jobs))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllAdminJobs();
  },[dispatch])
}

export default useGetAllAdminJobs
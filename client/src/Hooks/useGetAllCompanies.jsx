import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setCompanies} from '@/redux/companySlice'
import { useEffect } from 'react'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Adjust if token is stored elsewhere
        if (!token) {
          console.error('Authentication token is missing');
          return;
        }

        // Configuring headers for the request
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Include credentials for cross-origin requests if needed
        };
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials:true})
            if(res.data.success){
                dispatch(setCompanies(res.data.companies))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchCompanies();
  },[])
}

export default useGetAllCompanies
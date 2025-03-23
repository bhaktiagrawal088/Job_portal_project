import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate} from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { useState } from 'react'

function CreateCompany() {

  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState()
  const dispatch = useDispatch();


  const registerNewCompany =  async() => {
     
    try {

      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      if(res?.data?.success){
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`)

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error. data.res.message)
      
    }

  }
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto'>
      <div className='my-10'>
      <h1 className='font-bold text-2xl'>Your Company Name</h1>
      <p className='text-gray-500'>What would you like to give your company name ? you can change this later</p>
      </div>
       

        <Label>Company Name</Label>
        <Input onChange = {(e) => setCompanyName(e.target.value)}
        type="text" className="my-2" placeholder="Enter you company name"/>
        <div className='flex items-center gap-2 my-10'>
          <Button onClick = {() => navigate('/admin/companies')}
           variant="outline" className="text-red-700 font-bold hover:text-red-800 rounded-3xl " >Cancel</Button>
          <Button onClick= {registerNewCompany}
          className="bg-black text-white hover:bg-black rounded-3xl">Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateCompany

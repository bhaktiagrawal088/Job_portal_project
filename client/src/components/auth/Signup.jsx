import  { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading } from '@/redux/authSlice'

function Signup() {
    const [input, Setinput] = useState({
        fullname : "",
        email : "",
        phoneNumber : "",
        password : "",
        role : "",
        file : ""
    })

    const {loading, user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const changeEventListener = (e) => {
        Setinput({...input , [e.target.name] : e.target.value})
    }
    
    const changeFileHandler = (e) => {
        Setinput({...input , file : e.target.files[0]})
    } 
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if(input.file){
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
            });
            if(res.data.success){
                console.error("Error response:", res.data.message); // Log the error response for more info
                toast.success(res.data.message);
                navigate("/login")
            }
            else{
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error("Error response:", error.response); // Log the error response for more info
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again")
            
        }
        finally{
            dispatch(setLoading(false))
        }
        
    }
    useEffect(() => {
        if(user){
            navigate('/')
        }
    },[])
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md'>
                <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                <div className='my-2'>
                    <Label>Full name</Label>
                    <Input
                    type="text" 
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventListener}
                    placeholder="Enter your name"/>
                </div>
                <div className='my-2'>
                    <Label>Email</Label>
                    <Input 
                    type="email" 
                    value={input.email}
                    name="email"
                    onChange={changeEventListener}
                    placeholder="Enter your email"/>
                </div>
                <div className='my-2'>
                    <Label>Phone Number</Label>
                    <Input 
                    type="text" 
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventListener}
                    placeholder="Enter your phone number"/>
                </div>
                <div className='my-2'>
                    <Label>Password</Label>
                    <Input 
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventListener}
                    placeholder="Enter your password"/>
                </div>
                <div className='flex items-center justify-between'>
                    <RadioGroup value={input.role} onValueChange={(value) => Setinput({...input, role: value})} className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="student" id="student" />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="recruiter" id="recruiter" />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                    </RadioGroup>
                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input 
                        accept="image/*" 
                        type="file" 
                        onChange={changeFileHandler} 
                        className= "cursor-pointer "/>
                    </div>
                </div>
                
                    {
                        loading ? <Button className="w-full my-4" ><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> :
                        <Button className="w-full my-4 text-white bg-black hover:bg-black">Signup</Button>

                    }
                
                    <span className='text-sm'>Already have an account? 
                        <Link to='/login' className='text-blue-800 text-bold' >  Login</Link></span>
            </form>
        </div>
    </div>
  )
}

export default Signup

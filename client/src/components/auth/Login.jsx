import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

function Login() {
    const [input, Setinput] = useState({
        email : "",
        password : "",
        role : "",
      
    })
    const {loading, user} = useSelector(store => store.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventListener = (e) => {
        Setinput({...input , [e.target.name] : e.target.value})
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            });
            // console.log(res.data.success);
            
            if(res.data.success){
                dispatch(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message);
            }
        }       
       catch (error) {
        console.error("Error response:", error.response); // Log the error response for more info
        toast.error(error.response.data.message)

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
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
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
                        <Label>Password</Label>
                        <Input type="password"
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
                    </div>
                    {
                        loading ? <Button className="w-full my-4" ><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> :                         <Button className="w-full mb-2 text-white bg-black hover:bg-black">Login</Button>

                    }
                        <span className='text-sm'>Don't have have an account? 
                            <Link to='/signup' className='text-blue-800 text-bold' >  Signup</Link></span>
                </form>
            </div>
        </div>
      )
}

export default Login

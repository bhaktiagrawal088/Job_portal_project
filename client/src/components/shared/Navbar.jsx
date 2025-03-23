import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() { 
  const {user} = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {withCredentials: true})
      if(res.data.success){
          dispatch(setUser(null));
          navigate('/login')
          // console.log(res)
          toast.success('Logged out successfully')
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#6956a8]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
          {
            user && user.role === 'recruiter' ? (
              <>
                  <li><Link to="/admin/companies">companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
              </>
            )
          } 
          </ul>
            {
                !user ? (
                    <div className="flex gap-2 items-center ">
                        <Link to="/login">
                            <Button  className= "bg-gray-200 hover:bg-gray-300 rounded-xl" variant="">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-[#6A38C2] hover:bg-[#4f2596] text-white rounded-xl">Signup</Button>
                        </Link>
                    </div>
                ) : <div>
                <Popover className="bg-white">
            <PopoverTrigger asChild >
                <Avatar className= "cursor-pointer">
                    <AvatarImage src={user?.profile?.Profile_Photo || 'https://www.gravatar.com/avatar/placeholder'} alt="@shadcn" />
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white">
                <div className="flex gap-4 space-y-2">
                    <Avatar className= "cursor-pointer">
                        <AvatarImage src={user?.profile?.Profile_Photo || 'https://www.gravatar.com/avatar/placeholder'} alt="@shadcn" />
                    </Avatar>
                    <div>
                        <h4 className="font-medium">{user?.fullname || "User Avatar"}</h4>
                        <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                    </div>
                </div>
                    <div className="flex flex-col my-2 text-gray-600">
                    {
                      user && user?.role === "student" && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <User2/> 
                            <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                        </div>
                      )
                    }
                        <div className="flex w-fit items-center gap-2 cursor-pointer text-red-700 ">
                            <LogOut/>
                            <Button onClick={logoutHandler} variant="outline">Logout</Button>
                        </div>
                    </div>
            </PopoverContent>
          </Popover>
                </div>
            }
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;

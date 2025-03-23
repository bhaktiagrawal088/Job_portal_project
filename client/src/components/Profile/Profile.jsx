import Navbar from '../shared/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/Hooks/useGetAppliedJobs'
import { useState } from 'react'

// const skillsArray = ["HTML", "CSS", "JavaScripts", "React", "Node js", "Express js"]


function Profile() {

    useGetAppliedJobs()

    const [open , setOpen] = useState(false);
    const {user} = useSelector(store => store.auth); 
    const isResume = Boolean(user?.profile?.resume);

    // console.log("Resume URL:", user?.profile?.resume);


  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
      <div className='flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        <Avatar className="h-24 w-24  "> 
            <AvatarImage src={user?.profile?.Profile_Photo || 'https://www.gravatar.com/avatar/placeholder'} alt="Profile"
                className="border-2 rounded-full border-gray-400" />
        </Avatar>
        <div>
            <h1 className='font-medium text-xl '>{user?.fullname}</h1>
            <p>{user?.profile.bio}</p>
        </div>
        </div>
        <Button onClick = {() =>{ setOpen(true); console.log("Button Click")} }
        className="text-right" variant="outline"><Pen/></Button>
      </div>
        
        <div className='my-5'>
            <div className='flex items-center gap-3 my-2'>
                <Mail/>
                <span>{user?.email}</span>
            </div>
            <div className='flex items-center gap-3 my-2'>
                <Contact/>
                <span>{user?.phoneNumber}</span>
            </div>
        </div>


        <div  className='my-5' >
            <h1 className='font-medium text-lg'>Skills</h1>
            <div className='flex items-center gap-2'>
            {
                user?.profile?.skills?.length > 0 ? user.profile.skills.map((item, index) => <Badge className="bg-slate-600 text-white rounded-full hover:bg-slate-600 cursor-pointer" key={index}>{item}</Badge>) : <span>NA</span>
            }
            </div>      
        </div>
            
        <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label className="text-md text-bold">Resume</Label>
            
            {
                isResume ? <a target='_blank'   href={user?.profile?.resume}
            
                className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName || 'Resume not avaiable'}</a> : <span>NA</span>

            }

        </div>
        
            

        
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-lg'>
            <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
            <AppliedJobTable/>
        </div>

        <UpdateProfileDialog  open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile

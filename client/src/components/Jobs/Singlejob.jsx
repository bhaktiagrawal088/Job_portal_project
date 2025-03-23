import React from 'react'
import { Button } from '../ui/button'
import { BookMarked } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

function Singlejob({job}) {

    const navigate = useNavigate();
    // const jobId = "wertyuikjhcvb"

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff/(1000*24*60*60))
    }

    const daysAgo = job?.createdAt ? daysAgoFunction(job.createdAt) : null;

  return (
    <div className='p-5 rounded-md shadow-md bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>{daysAgo === null ? "Today" : `${daysAgo} days ago`}</p>
            <Button variant="outline" className="rounded-full" size = "icon"><BookMarked/></Button>
        </div>
        <div className='flex items-center gap-2 my-2 '>
            <Button className= " p-0.5 w-10 h-10" variant="outline" size="icons">
                <Avatar>
                    <AvatarImage  src={job?.company?.logo}></AvatarImage>
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}.</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost ">{job?.position} Position</Badge>
            <Badge className={'text-orange-700 font-bold'} variant="ghost ">{job?.jobType}</Badge>
            <Badge className={'text-green-700 font-bold'} variant="ghost ">{job?.salary}LPA</Badge>

        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
            <Button className="bg-purple-800 hover:bg-purple-900 text-white">Save for later</Button>
        </div>
    </div>
  )
}

export default Singlejob

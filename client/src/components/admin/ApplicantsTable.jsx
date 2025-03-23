import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'

const ApplicantsTable = () => {

    const shortlistingStatus = ["Accepted", "Rejected"];
    const {applicants} = useSelector(store => store.application)

    const statusHandler =  async (status, id) => {
        // console.log('called')
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status})
            // console.log(res);
            
            if(res.data.success){
                toast.success(res.data.message)
            }
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            
        }
    }


  return (
    <>
        <Table>
            <TableCaption>A list of your recent applied user</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead>FullName</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>

            {
                applicants && applicants?.applications?.map((item) => (
                    <tr key={item.id}>
                    <TableCell>{item?.applicant?.fullname}</TableCell>
                    <TableCell>{item?.applicant?.email}</TableCell>
                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                    <TableCell>
                    {
                        item?.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOriginalName}</a> : <span>No available</span>
                    }
                    </TableCell>
                    <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right">
                        <Popover>
                            <PopoverTrigger>
                                <MoreHorizontal/>
                            </PopoverTrigger>

                            <PopoverContent className="w-32">
                                {
                                    shortlistingStatus.map((status, index) => {
                                        return (
                                            <div key={index} onClick={() => statusHandler(status, item?._id)}>
                                                <span>{status} </span>
                                            </div>
                                        )
                                    })
                                }
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </tr>
                ))
            }
               
            </TableBody>

        </Table>
    </>
  )
}

export default ApplicantsTable
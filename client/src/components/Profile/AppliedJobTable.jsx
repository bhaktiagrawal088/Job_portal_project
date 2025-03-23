import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

function AppliedJobTable() {
  const {allAppliedJobs} = useSelector(store => store.job)

  const validAppliedJobs = allAppliedJobs.filter(appliedjob => appliedjob.job && appliedjob.job.title && appliedjob.job.company);

  return (
    <div>
      <Table>
        <TableCaption>List of  your Applied Jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                validAppliedJobs.length < 0 ? <span>You haven't applied any job</span>: validAppliedJobs.map((appliedjob) => (
                    <TableRow key={appliedjob._id}>
                        <TableCell>{appliedjob.createdAt.split('T')[0]}</TableCell>
                        <TableCell>{appliedjob.job.title }</TableCell>
                        <TableCell>{appliedjob.job.company.name }</TableCell>
                        <TableCell><Badge 
                        className = {`text-white rounded-full hover:bg-slate-600 ${appliedjob?.status === "rejected" ? 'bg-red-400 hover:bg-red-400' : appliedjob.status === "pending" ?'bg-slate-600' : 'bg-green-600 hover:bg-green-600'}`}>
                        {appliedjob.status.toUpperCase()} </Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable

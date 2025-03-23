import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies , searchCompanyByText} = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) =>{
      if(!searchCompanyByText){
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText])
  return (
    <>
      <Table>
        <TableCaption>A list of your recent register companies</TableCaption>
        <TableHeader>
          <TableRow className="font-bold">
            <TableCell>Logo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className="text-right ">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                No companies found
              </TableCell>
            </TableRow>
          ) : 
              (
                filterCompany?.map((company) => (
                <tr>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          width={52}
                          height={52}
                          src={company.logo}
                        ></AvatarImage>
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>                  
                    {company.createdAt ? company.createdAt.split("T")[0] : "N/A"}
                    </TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger asChild>
                          <MoreHorizontal  className="inline-block"/>
                        </PopoverTrigger>
                        <PopoverContent className="w-24 h-12 bg-white">
                        <div className="">
                          <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                            <Edit2 className="w-4" />
                            <span>Edit</span>
                          </div>

                        </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </tr>
                ))
              )}
        </TableBody>
      </Table>
    </>
  );
 };

export default CompaniesTable;

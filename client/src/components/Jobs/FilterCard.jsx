import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useEffect, useState } from 'react';

const filterData = [
    {
        filterType : "Location",
        array : ["Delhi" , "Banglore" , "Hyderabad", "Pune" , "Mumbai"]
    },
    {
        filterType : "Industry",
        array : [ "Backend Developer" , "Frontend Developer", "Full-Stack Developer", "Data Scientist", "Cloud Engineer","Finance" , "Healthcare" , "Manufacturing"]
    },{
        filterType : "Job Type",
        array : ["Full Time", "Part Time", "Internship"]
    },
    {
        filterType : "Salary",
        array : ["Below 5 LPA", "5-10 LPA", "10-30 LPA" , "30-60 LPA" ]
    }
]
function FilterCard() {
    const[selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        // console.log(selectedValue);
        dispatch(setSearchQuery(selectedValue))
        
    },[selectedValue])
  return (
    <div className='w-full bg-white rounded-md p-3'>
        <h1 className='font-bold'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup  value={selectedValue} onValueChange={changeHandler}>
            {
                filterData.map((data, index) => (
                    <div>
                        <h1 className='font-medium'>{data.filterType}</h1>
                        {
                            data.array.map((item, indx) => {
                                const itemId = `r${index}-${indx}` 
                                return(
                                    <div className='flex items-center space-x-2 my-2 text-sm'>
                                    <RadioGroupItem value={item} id={itemId}/>
                                    <label htmlFor={itemId}>{item}</label>
                                    </div>
                                )
                               
                        })
                        }
                    </div>
                ))
            }
            
        </RadioGroup>
    </div>
  )
}

export default FilterCard

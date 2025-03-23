import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Graphic Designer",
    
]

function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        // console.log(query)
        dispatch(setSearchQuery(query));
        navigate('/browse')
    }
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-5">
            <CarouselContent className="flex space-x-1">
               {
                category.map((cat, index) => (
                    <CarouselItem className= "md:basis-1/3 lg-basis-1/5 flex-shrink-0">
                        <Button onClick = {() => searchJobHandler(cat)}
                        variant="outline" className="rounded-xl">{cat}</Button>
                    </CarouselItem>
                ))
               }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
      
    </div>
  )
}

export default CategoryCarousel

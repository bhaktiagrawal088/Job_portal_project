import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useState } from 'react'


function UpdateProfileDialog({open, setOpen}) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
      fullname: user?.fullname || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills?.map(skill => skill) || "",
      file: user?.profile?.resume || ""
  });
  const dispatch = useDispatch();

  const onChangeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
      const file = e.target.files?.[0];
      setInput({ ...input, file })
  }

  const SumbitEventHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);
      if (input.file) {
          formData.append("file", input.file);
      }
      try {
          setLoading(true);
          const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              },
              withCredentials: true
          });
          if (res.data.success) {
              dispatch(setUser(res.data.user));
              toast.success(res.data.message);
          }
      } catch (error) {
        console.log(error);
          toast.error(error.response.data.message);
      } finally{
          setLoading(false);
      }
      setOpen(false);
    //   console.log(input);
  }

  return (

      <Dialog open={open} onOpenChange={setOpen}  >
        <DialogContent className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg" >
            <DialogHeader className="text-center">
                <DialogTitle className="text-xl font-semibold">Update Profile</DialogTitle>
            </DialogHeader>
            <form className="mt-4" onSubmit={SumbitEventHandler}>
                <div className='grid gap-2' >
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-2">
                      <Label htmlFor="name" className="text-center text-sm font-medium">Name</Label>
                      <Input id="name" name="name" type="text" value={input.fullname} onChange={onChangeEventHandler}
                      className="col-span-3 border border-gray-300 rounded-md "/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-2">
                      <Label htmlFor="email" className="text-center text-sm font-medium">Email</Label>
                      <Input id="email" name="email" type="email" value={input.email} onChange={onChangeEventHandler}
                      className="col-span-3 border border-gray-300 rounded-md "/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-2">
                      <Label htmlFor="number" className="text-center text-sm font-medium">Phone Number</Label>
                      <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={onChangeEventHandler}
                       className="col-span-3 border border-gray-300 rounded-md "/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-2">
                      <Label htmlFor="bio" className="text-center text-sm font-medium">Bio</Label>
                      <Input id="bio" name="bio" value={input.bio} onChange={onChangeEventHandler}
                       className="col-span-3 border border-gray-300 rounded-md "/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-2">
                      <Label htmlFor="skills" className="text-center text-sm font-medium">Skills</Label>
                      <Input id="skills" name="skills" value={input.skills} onChange={onChangeEventHandler}
                       className="col-span-3 border border-gray-300 rounded-md "/>
                  </div>
                
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-2">
                      <Label htmlFor="file" className="text-center text-sm font-medium">Resume</Label>
                      <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler}
                      className="col-span-3 border border-gray-300 rounded-md "/>
                  </div>

                  {/* <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-2">
                      <Label htmlFor="profile" className="text-center text-sm font-medium">Profile_Photo</Label>
                      <Input id="profile" name="profile" type="file" accept="image/*" onChange={fileChangeHandler}
                      className="col-span-3 border border-gray-300 rounded-md "/>
                  </div> */}

                    {/* Profile Preview
                      {profilePreview && (
                        <div className=" flex justify-center">
                          <img
                            src={profilePreview}
                            alt="Profile Preview"
                            className="w-14 h-14 rounded-full border border-gray-300 object-cover"
                          />
                        </div>
                      )} */}
                </div>
                <DialogFooter className="mt-4">
                  {
                    loading ? <Button className="w-full my-4" ><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <Button className="w-full mb-2 text-white bg-black hover:bg-black">Update</Button>

                  }
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
  
  )
}

export default UpdateProfileDialog

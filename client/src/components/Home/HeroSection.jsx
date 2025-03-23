import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const searchJobHandler =  () => {
    dispatch(setSearchQuery(query));
    navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-400 font-medium ">
            Prime Job Spot
        </span>
        <h1 className="text-5xl font-bold">
          Search , Apply & <br />
          Get You <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="font-medium text-center">
          Find your dream job with our easy-to-use search platform, designed to
          help you discover exciting career opportunities that match your
          skills, experience, and aspirations.
        </p>
        <p>
          Start exploring today and take the next step toward your ideal{" "}
          <span className="italic text-xl text-bold text-indigo-700">
            career path!
          </span>
        </p>
        <div className="flex w-full md:w-[40%] shadow-lg border border-gray-300 items-center p-0.2 m-0.5 mx-auto gap-2 rounded-full bg-white transition-all hover:shadow-xl">
  <input
    type="text"
    placeholder="Search your dream jobs"
    onChange={(e) => setQuery(e.target.value)}
    className="outline-none border-none w-full px-4 py-2 text-gray-700 placeholder-gray-400 rounded-full bg-transparent focus:ring-2 focus:ring-indigo-700"
  />
  <Button onClick = {searchJobHandler}
  className="rounded-full bg-indigo-800 hover:bg-indigo-900 text-white p-2 h-12 w-12 flex items-center justify-center transition-all">
    <Search className="w-5 h-5"/>
  </Button>
</div>


      </div>
    </div>
  );
}

export default HeroSection;

"use client"

import { useUser } from "@/store";
import { HiBookOpen } from "react-icons/hi";

export default function Home() {
  const {studentType} = useUser((state) => state)
  return (
      <div className="grid grid-cols-5 gap-4 mt-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-1 flex flex-col justify-center items-center gap-5 rounded-3xl bg-[#E4F5E0] h-56">
              <span className="poppins-bold text-6xl">0</span>
              <h1 className="text-gray-600">Certificates</h1>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center gap-5 rounded-3xl bg-[#F9EFDE] h-56">
              <span className="poppins-bold text-6xl">0</span>
              <h1 className="text-gray-600">{studentType?.toLowerCase() === "professional" ? 'courses' : 'subjects'}</h1>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center gap-5 rounded-3xl bg-[#F3DEFA] h-56">
              <span className="poppins-bold text-6xl">0</span>
              <h1 className="text-gray-600">hours</h1>
            </div>
          </div>

          <div className="col-span-3 rounded-3xl h-36 p-4 bg-[#ECDEFA]">
            <h1 className="inline-flex gap-2 justify-center items-center poppins-semibold"><span><HiBookOpen size={35} color="#4D417C" /></span> Learnings today</h1>

            <h1 className="poppins-semibold text-xl"><span className="poppins-bold text-6xl">0</span> min</h1>
          </div>

          <div className="col-span-3 h-40 p-4 bg-[#F7D5EA] rounded-3xl">
            <h1 className="poppins-bold text-3xl">Topics covered</h1>
            <h1 className="poppins-semibold"><span className="poppins-bold text-6xl">0</span> topics</h1>
          </div>
          <div className="col-span-3 h-40 -mt-14 p-4 bg-[#E4DFFF] rounded-3xl"> 
            <h1 className="poppins-bold text-3xl">Tutors interacted with</h1>
            <h1 className="poppins-semibold"><span className="poppins-bold text-6xl">0</span> tutors</h1>
          </div>
        </div>
        <div className="col-span-3 bg-[#F0EFF4] rounded-3xl grid grid-cols-2 p-6 gap-4">
          <div className="col-span-1">
            <div className="bg-[#F7D5EA] pb-10 rounded-3xl w-full p-4 flex flex-col justify-start items-start gap-4">
              <div className="flex w-full flex-row justify-between items-center poppins-semibold">
                <h1>Progress</h1>
                <h1><span>0</span>%</h1>
              </div>

              <div className="bg-[#F0C6DB] w-full relative h-2 rounded-3xl overflow-hidden">
                <div className="bg-[#312829] h-2 w-[0%]"></div>
              </div>
  
              <div className="mt-10 bg-[#F4C5DF] h-72 w-72 rounded-full mx-auto flex flex-col justify-center items-center">
                <HiBookOpen size={300} color="#D991B7" className="-mt-20" />

                <p className="text-gray-600 -mt-10">Consistency is the key</p>
              </div>
            </div>

            <h1>Quick Quizzes</h1>
          </div>
          <div className="col-span-1">
            <div>calendar</div>
            <div>core results</div>
            <div>schedules</div>
            <div>activities</div>
          </div>
        </div>
      </div>
  );
}

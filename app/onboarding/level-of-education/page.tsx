"use client"

import { Button } from "@/components";
import Image from "next/image";
import { useState } from "react";

export default function StudentType() {
    const [studentType, setStudentType] = useState('')
  return (
    <div className="h-full flex flex-col justify-center items-center">
        <div className="w-[35rem] flex flex-col justify-center items-center gap-10">
            <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
                <div onClick={() => setStudentType("secondary")} className={`hover:border cursor-pointer rounded-lg flex flex-col justify-center items-center ${studentType === "secondary" && 'bg-blue-300'}`}>
                    <Image
                        src={"/secondary.png"}
                        height={200}
                        width={200}
                        alt="secondary"
                        className="object-cover"
                    />
                    <h1 className="text-gray-500 poppins-semibold text-lg">Secondary</h1>
                </div>
                <div onClick={() => setStudentType("professional")} className={`hover:border cursor-pointer rounded-lg flex flex-col justify-center items-center ${studentType === "professional" && 'bg-pink-300'}`}>
                    <Image
                        src={"/college.png"}
                        height={200}
                        width={200}
                        alt="secondary"
                        className="object-cover"
                    />
                    <h1 className="text-gray-500 poppins-semibold text-lg">College</h1>
                </div>
            </div>
            <Button handleOnClick={()=>{}} fullWidth primary>
                Continue
            </Button>
        </div>
    </div>
  )
}

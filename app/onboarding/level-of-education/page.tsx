"use client"

import { Button } from "@/components";
import { BASEURL } from "@/constants";
import { useUser } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StudentType() {
    const [studentType, setStudentType] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const {setData, } = useUser((state) => state)

    const router = useRouter()

    const submitStudentProfile = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${BASEURL}/student-profiles/`, {
                method: 'POST',
                body: JSON.stringify({
                    education_type: studentType,
                    is_active: true
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })

            const data = await response.json()

            if(data?.status_code === 401) {
                setError(data.detail)
                return console.log(data.detail);
            }
            if(data?.status_code === 400) {
                setError(data.detail.non_field_errors[0])
                return console.log(data.detail.non_field_errors[0]);
            }

            console.log('data', data)

            setData({
                studentType,
                profileId: data.id,
                userId: data.user
            })

            router.push("/onboarding/subjects")
        } catch (error) {
            setError("Something went wrong")
            console.log('error', error)
        } finally {
            setError("")
            setLoading(false)
        }
    }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">

        <div className="block md:hidden">
            <Image
                src={"/logo.png"}
                width={180}
                height={180}
                alt="logo"
                className="object-cover"
            />
        </div>

        <div className="w-5/6 md:w-[35rem] flex flex-col justify-center items-center gap-10">
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
            <Button handleOnClick={submitStudentProfile} fullWidth primary loading={loading} disabled={loading}>
                Continue
            </Button>
            <span className="text-red-500">{error}</span>
        </div>
    </div>
  )
}

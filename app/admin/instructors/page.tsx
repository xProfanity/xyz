"use client"

import { Button } from "@/components"
import useFetch from "@/hooks/useFetch"
import { TutorProfile } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Instructors() {
    const [tutors, setTutors] = useState<TutorProfile[]>([])
  
    const {fetchRequest} = useFetch()
    const router = useRouter()
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const students = await fetchRequest('student-profiles', 'GET')
          const tutors = await fetchRequest('tutors', 'GET')
          setTutors(tutors)
        } catch (error) {
          console.log('error', error)
        }
      }
  
      fetchData()
    }, [])
  return (
    <section className='flex flex-col justify-start items-start relative'>
      <div className="w-full flex flex-row justify-end items-center">
        <Button handleOnClick={() => router.push('/admin/register')} primary>
          Register Tutor
        </Button>
      </div>
      <div className="w-full mt-5 relative">
        <div className="grid grid-cols-5 items-center bg-gray-100 h-12">
          <h1 className="col-span-1 text-center">Name</h1>
          <h1 className="col-span-1 text-center">Email</h1>
          <h1 className="col-span-1 text-center">Instructor ID</h1>
          <h1 className="col-span-1 text-center">Education Type</h1>
          <h1 className="col-span-1 text-center">Activity</h1>
        </div>
        {/* {tutors?.map((answer, index) => (
          <div key={index} className="grid grid-cols-5 items-center border-b border-gray-100 py-2">
            <h1 className="col-span-1 text-center capitalize">{answer.question.educationType}</h1>
            <h1 className="col-span-1 text-center capitalize">{answer.question.level || answer.question.form}</h1>
            <h1 className={`col-span-1 text-center ${answer.question.educationType === "professional" ? 'uppercase' : 'capitalize'}`}>{answer.question.subject || answer.question.course}</h1>
            <h1 className="col-span-1 text-ellipsis capitalize">{answer.question.question}</h1>
            <h1 className="col-span-1 text-ellipsis capitalize">{answer.answer}</h1>
          </div>
        ))} */}
      </div>
    </section>
  )
}

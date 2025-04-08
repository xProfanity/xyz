"use client"

import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react"
import { BsFilter } from "react-icons/bs"

interface StudentProfile {
  id: number
  user: number
  education_type: string
  is_active: boolean
  date_joined: string
}

interface TutorProfile {
  id: number
  user: {
    id: number
    name: string
    email: string
  }
  bio: string
  profile_picture: string
  education_types: string[]
  courses: string[]
  qualifications: string
  is_active: boolean
  date_joined: string
}

export default function Admin() {
  const [students, setStudents] = useState<StudentProfile[]>([])
  const [tutors, setTutors] = useState<TutorProfile[]>([])

  const {fetchRequest} = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await fetchRequest('student-profiles', 'GET')
        const tutors = await fetchRequest('tutors', 'GET')
        setStudents(students)
        setTutors(tutors)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [])
  return (
    <section className='flex flex-col justify-start items-start'>
      <div className="w-full flex justify-evenly items-center mt-10">
        <div className="h-60 w-96 bg-pink-400 flex flex-col justify-center items-center rounded-3xl">
          <h1 className="text-3xl text-white">{students?.length} students</h1>
        </div>
        <div className="h-60 w-96 bg-purple-400 flex flex-col justify-center items-center rounded-3xl">
          <h1 className="text-3xl text-white">{tutors?.length} tutors</h1>
        </div>
        <div className="h-60 w-96 bg-violet-400 flex flex-col justify-center items-center rounded-3xl">
          <h1 className="text-3xl text-white">{tutors?.length + students?.length} total</h1>
        </div>
      </div>

      <div className="shadow-sm shadow-amber-200 bg-gray-100 w-full mt-10 flex flex-row justify-between items-center px-4">
        <div className="flex flex-row w-full">
          <p className="py-4 px-4 poppins-semibold border-b-2 border-primary">Students</p>
          <p className="py-4 px-4 poppins-semibold border-b-2 border-primary">Tutors</p>
        </div>

        <div>
          <BsFilter size={35} />
        </div>
      </div>

      <div className="w-full mt-5">
        <div className="flex flex-row justify-around items-center">
          <h1>Name</h1>
          <h1>Email</h1>
          <h1>Education Type</h1>
          <h1>Subscribed</h1>
          <h1>Is Active</h1>
        </div>
      </div>
    </section>
  )
}

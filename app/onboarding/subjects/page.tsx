"use client"

import { Button } from "@/components"
import useFetch from "@/hooks/useFetch"
import { useUser } from "@/store"
import { useEffect, useState } from "react"

interface Subject {
    id: 0,
    name: string,
    education_type: string,
    description: string
}

export default function Subjects() {
  
  const [subjects, setSubjects] = useState<Subject[] | null>(null)
  const {role, studentType}= useUser((state) => state)
  const {fetchRequest} = useFetch()

  console.log('studentType', studentType)
  console.log('subjects', subjects)

  useEffect(() => {
    const fetchSubjects = async () => {
      console.log("called");

      const student_type = JSON.parse(localStorage.getItem('user') as string)?.state.studentType

      try {
        const response = await fetchRequest(`${student_type === "professional" ? 'courses' : 'subjects'}/`, 'GET')
  
        console.log('data', response)
        setSubjects(response)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchSubjects()
  }, [studentType])

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mt-20 poppins-semibold text-gray-500">I want to learn</h1>
      
      {subjects ? (
        <div className="mt-10 flex flex-row flex-wrap justify-center items-center w-full md:w-1/2 p-5 gap-5">
          {subjects.map((subject, index) => (
            <Subject subject={subject} key={index} />
          ))}
        </div>
      ) : (
        <h1 className="poppins-light mt-10">Loading...</h1>
      )}

      {subjects && (
        <div className="w-5/6 md:w-1/2 mt-10">
          <Button handleOnClick={()=>{}} primary fullWidth classes={"rounded-lg"}>
            Finish
          </Button>
        </div>
      )}
     </div>
  )
}

const Subject = ({subject}: {subject: Subject}) => {
  
  return (
    <div className="w-40 h-40 border hover:border-primary hover:outline-4 hover:outline-primary cursor-pointer rounded-lg flex flex-col justify-between items-center p-1"
      // onClick={selectCourse}
    >
      <p className="text-orange-500 poppins-semibold text-lg">{subject.name}</p>
      <p className="text-sm poppins-bold text-gray-500 capitalize">{subject.education_type}</p>
      <p className="text-sm text-gray-500 text-center">{subject.description}</p>
    </div>
  )
}
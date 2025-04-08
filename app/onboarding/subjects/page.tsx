"use client"

import { Button } from "@/components"
import useFetch from "@/hooks/useFetch"
import { useUser } from "@/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Subject {
    id: number
    name: string
    education_type: string
    description: string
    isActive: boolean
    course: string | null
}

export default function Subjects() {
  
  const [subjects, setSubjects] = useState<Subject[] | null>(null)
  const {role, studentType, profileId} = useUser((state) => state)
  const {fetchRequest} = useFetch()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  console.log('subjects', subjects)

  const handleEnrollment = async () => {
    const selectedSubject = subjects?.filter((subject) => subject.isActive)[0]

    try {
      setIsLoading(true)
      const response = await fetchRequest('enrollments/', 'POST', JSON.stringify({
        student: profileId,
        current_level: studentType === "professional" ? "" : selectedSubject?.name,
        course: studentType === "secondary" ? "" : selectedSubject?.course,
        status: "active"
      }))

      console.log('response', response)
      router.push('/student')
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectCourse = (id: number) => {
    const selectedSubject = subjects?.map((subject, index) => {
      if(subject.id === id && !subject.isActive) {
        return {
          ...subject,
          isActive: true
        }
      }

      return {
        ...subject,
        isActive: false
      }
    })

    setSubjects(selectedSubject as Subject[] | null)
  }

  useEffect(() => {
    const fetchSubjects = async () => {
      const student_type = JSON.parse(localStorage.getItem('user') as string)?.state.studentType
      try {
        const response = await fetchRequest(`levels/?education_type=${studentType}`, 'GET')
  
        const subjects = response?.map((item: Subject) => ({...item, isActive: false})) as Subject[] | null

        console.log('data', response)
        setSubjects(subjects)
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
        <div className="mt-10 flex flex-row flex-wrap p-5 gap-5 flexible-grid">
          {subjects.map((subject, index) => (
            <Subject subject={subject} selectCourse={selectCourse} key={index} />
          ))}
        </div>
      ) : (
        <h1 className="poppins-light mt-10">Loading...</h1>
      )}

      {subjects && (
        <div className="w-5/6 md:w-1/2 mt-10">
          <Button handleOnClick={handleEnrollment} primary fullWidth classes={"rounded-lg"} disabled={isLoading} loading={isLoading}>
            Finish
          </Button>
        </div>
      )}
     </div>
  )
}

const Subject = ({subject, selectCourse}: {subject: Subject, selectCourse: (id: number) => void}) => {

  return (
    <div className={`border hover:border-primary hover:outline-4 hover:outline-primary cursor-pointer rounded-lg flex flex-col justify-between items-center p-1 ${subject.isActive && 'bg-primary/50 border-0 outline-4 outline-primary'}`}
      onClick={() => selectCourse(subject.id)}
    >
      <p className="text-orange-500 poppins-semibold text-lg">{subject.name}</p>
      <p className="text-sm poppins-bold text-gray-500 capitalize">{subject.education_type}</p>
      <p className="text-sm text-gray-500 text-center">{subject.description}</p>
    </div>
  )
}
"use client"

import useFetch from '@/hooks/useFetch'
import { fetchAnswers, fetchQuestions } from '@/services/sanity'
import { useUser } from '@/store'
import { Answer, Question, StudentProfile } from '@/types'
import React, { useEffect, useState } from 'react'
import { BsFilter } from 'react-icons/bs'

export default function Tutor() {
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [answers, setAnswers] = useState<Answer[] | null>(null)
  const [students, setStudents] = useState<StudentProfile[]>([])
  

  const {userId} = useUser((state) => state)
  const {fetchRequest} = useFetch()
  

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questions = await fetchQuestions(userId)
        const answers = await fetchAnswers(userId)
        const students = await fetchRequest('student-profiles', 'GET')

        console.log('students', students)

        setQuestions(questions)
        setAnswers(answers)
        setStudents(students)
      } catch (error) {
        console.log('error', error)
      }
    }

    getQuestions()
  }, [userId])
  return (
    <section className='flex flex-col justify-start items-start'>
          <div className="w-full flex justify-evenly items-center mt-10">
            <div className="h-60 w-96 bg-violet-400 flex flex-col justify-center items-center rounded-3xl">
              <h1 className="text-3xl text-white">{students?.length} students</h1>
            </div>
            <div className="h-60 w-96 bg-pink-400 flex flex-col justify-center items-center rounded-3xl">
              <h1 className="text-3xl text-white">{questions?.length} Questions</h1>
            </div>
            <div className="h-60 w-96 bg-purple-400 flex flex-col justify-center items-center rounded-3xl">
              <h1 className="text-3xl text-white">{answers?.length} answer{answers?.length !== 1 && 's'}</h1>
            </div>
          </div>
    
          <div className="shadow-sm shadow-amber-200 bg-gray-100 w-full mt-10 flex flex-row justify-between items-center px-4">
            <div className="flex flex-row w-full">
              <p className="py-4 px-4 poppins-semibold border-b-2 border-primary">Students</p>
              <p className="py-4 px-4 poppins-semibold border-b-2 border-primary">Tutors</p>
            </div>
    
            <div>
              <BsFilter size={20} />
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

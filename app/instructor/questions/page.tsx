"use client"

import { Button } from "@/components"
import { fetchQuestions } from "@/services/sanity"
import { useUser } from "@/store"
import { Question } from "@/types"
import { useEffect, useState } from "react"
import { BsFilter } from "react-icons/bs"

export default function ManageQuestions() {
  const [questions, setQuestions] = useState<Question[] | null>()

  const {userId} = useUser((state) => state)

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetchQuestions(userId)
        setQuestions(response)
      } catch (error) {
        console.log('error', error)
      }
    }

    getQuestions()
  }, [])
  return (
    <section className='flex flex-col justify-start items-start relative'>
      <div className="w-full flex flex-row justify-end items-center">
        <Button handleOnClick={() => {}} primary>
          Add/Edit Questions
        </Button>
      </div>
      <div className="w-full mt-5 relative">
        <div className="grid grid-cols-5 items-center bg-gray-100 h-12">
          <h1 className="col-span-1 text-center">Question</h1>
          <h1 className="col-span-1 text-center">Education Type</h1>
          <h1 className="col-span-1 text-center">Course/Subject</h1>
          <h1 className="col-span-1 text-center">Level</h1>
          <h1 className="col-span-1 text-center">Answers</h1>
        </div>
        {questions?.map((question, index) => (
          <div key={index} className="grid grid-cols-5 items-center border-b border-gray-100 py-2">
            <h1 className="col-span-1 text-ellipsis capitalize">{question.question}</h1>
            <h1 className="col-span-1 text-center capitalize">{question.educationType}</h1>
            <h1 className={`col-span-1 text-center ${question.educationType === "professional" ? 'uppercase' : 'capitalize'}`}>{question.subject || question.course}</h1>
            <h1 className="col-span-1 text-center capitalize">{question.level || question.form}</h1>
            <h1 className="col-span-1 text-center">{question.submissions?.length || 0}</h1>
          </div>
        ))}
      </div>
    </section>
  )
}
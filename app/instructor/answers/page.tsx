"use client"

import { fetchAnswers } from '@/services/sanity'
import { useUser } from '@/store'
import { Answer } from '@/types'
import React, { useEffect, useState } from 'react'

export default function Answers() {
    const [answers, setAnswers] = useState<Answer[] | null>(null)

    const {userId} = useUser((state) => state)

    useEffect(() => {
        const getAnswers = async () => {
            try {
                const response = await fetchAnswers(userId)
                setAnswers(response)
            } catch (error) {
                console.log('error', error)
            }
        }

        getAnswers()
    }, [userId])

  return (
    <section className='flex flex-col justify-start items-start relative overflow-y-scroll'>
      <div className="w-full mt-5 relative overflow-y-scroll">
        <div className="grid grid-cols-5 bg-gray-100 h-12">
          <h1 className="col-span-1 text-center">Student ID</h1>
          <h1 className="col-span-1 text-center">Level</h1>
          <h1 className="col-span-1 text-center">Subject</h1>
          <h1 className="col-span-1 text-center">Question</h1>
          <h1 className="col-span-1 text-center">Answer</h1>
        </div>
        {answers?.map((answer, index) => (
          <div key={index} className="grid grid-cols-5 items-center border-b border-gray-100 py-2">
            <h1 className="col-span-1 text-center capitalize">{answer.question.educationType}</h1>
            <h1 className="col-span-1 text-center capitalize">{answer.question.level || answer.question.form}</h1>
            <h1 className={`col-span-1 text-center ${answer.question.educationType === "professional" ? 'uppercase' : 'capitalize'}`}>{answer.question.subject || answer.question.course}</h1>
            <h1 className="col-span-1 text-ellipsis capitalize">{answer.question.question}</h1>
            <h1 className="col-span-1 text-ellipsis capitalize">{answer.answer}</h1>
          </div>
        ))}
      </div>
    </section>
  )
}

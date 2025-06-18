"use client"

import { fetchQuestionsByEducationType } from '@/services/sanity'
import { useTabs, useUser } from '@/store'
import { Question } from '@/types'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'sonner'

export default function Questions() {
  const [questions, setQuestions] = useState<Question[] | null>(null)

  const [fetching, setFetching] = useState(false)

  const {studentType: educationType, form, course} = useUser()

  console.log('questions', questions)

  console.log('educationType', educationType)

  useEffect(() => {
    const handleFetchLectures = async () => {
      try {

        setFetching(true)
        const response = await fetchQuestionsByEducationType(educationType as string, form as string, course as string)
        setQuestions(response)
      } catch (error) {
        console.log('error', error)
        toast.error("error fetching lectures")
      } finally {
        setFetching(false)
      }
    }

    handleFetchLectures()
  }, [])

  return (
    <div className="flex flex-row flex-wrap justify-center items-center md:justify-normal md:items-start gap-4 w-full mt-4">
        {questions?.map((question, index) => (
          <Link href={`/question/${question._id}`} key={index} className="w-[300px] flex-1/2 md:flex-1/4 lg:flex-1/5 xl:flex-1/6 rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col justify-between p-4">
            <h1>{question.question}</h1>

            <div>
              <div className="mt-2">
                <p className="font-bold text-lg">{question.subject || question.course}</p>
              </div>
              <div className="mt-2 flex flex-row justify-between items-center">
                <p className="text-gray-400">{dayjs(question._createdAt).format("DD MMMM, YYYY")}</p>
                <p>{question.submissions?.length || 0} answer{question.submissions?.length !== 1 && 's'}</p>
              </div>
            </div>
          </Link>
        ))}
        {fetching && (
          [...Array(4)].map((_, index) => (
            <Skeleton height={500} width={300} className="rounded-lg" key={index} />
          ))
        )}
    </div>
  )
}

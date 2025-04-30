"use client"

import { useUser } from '@/store'
import { Question } from '@/types'
import dayjs from 'dayjs'
import React from 'react'
import AnswerFields from './AnswerFields'
import AnswerCards from './AnswerCards'

interface Props {
    question: Question
}

export default function QuestionDetail({question}: Props) {
    const {role} = useUser()
  return (
    <div>
        <h1 className='poppins-bold md:poppins-black text-xl md:text-6xl'>{question.question}</h1>
        <p className='text-gray-400 mt-4'>{dayjs(new Date(question._createdAt as Date)).format("DD MMMM, YYYY")}</p>


        <div className='flex flex-row justify-between items-center mt-4'>
            <h1 className={`${question.course ? 'uppercase' : 'capitalize'}`}>{question.course || question.subject}</h1>
            <h1 className={`capitalize`}>{question.level || question.form}</h1>
        </div>

        {
            role?.toLocaleLowerCase() === 'instructor' && (
                <AnswerCards submissions={question.submissions} questionId={question._id as string} />
            )
        }
        {
            role?.toLowerCase() === "student" && (
                <AnswerFields />
            )
        }
    </div>
  )
}

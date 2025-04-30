"use client"

import { Button, Input } from '@/components';
import { fetchAnswers, fetchAnswersByQuestion, gradeAnswer } from '@/services/sanity'
import { Answer } from '@/types';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function AnswerCards({submissions, questionId}: {submissions: string[] | null; questionId: string}) {

    const [answers, setAnswers] = useState<Answer[] | null>(null)
    const [grade, setGrade] = useState("Grade the answer")
    const [comment, setComment] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleGradingAnswer = async (answerId: string) => {

        if(Number.isNaN(parseInt(grade))) {
            return setError("Please grade the student")
        }

        try {
            setLoading(true)
            await gradeAnswer(answerId, comment, parseInt(grade))
            setError("")
            toast.success("Successfully graded the answer")

            const updatedList = answers?.filter((answer) => !answer.grade) as Answer[]
            setAnswers(updatedList)
        } catch (error) {
            console.log('error', error)
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const loadAnswers = async () => {
            console.log("gang shit");
            
            const answers = await fetchAnswersByQuestion(questionId)

            setAnswers(answers)
        }

        loadAnswers()
    }, [submissions])

  return (
    <div className='mt-4 border-t border-gray-200 py-4 divide-y divide-gray-200'>
        {!submissions || answers?.length === 0 ? (
            <p className='text-gray-400'>No students provided an answer to this question yet</p>
        ) : (
            answers?.map((answer, index) => (
                <div key={index}>
                    <h1>{answer.answer}</h1>

                    <div className='mt-4 flex flex-row justify-between items-center'>
                        <p className='text-gray-400'>Student ID: {answer.studentId}</p>
                        <p className='text-gray-400'>{dayjs(new Date(answer._createdAt as Date)).format("DD MMMM, YYYY")}</p>
                    </div>

                    <div className='mt-4'>
                        <Input
                            type='number'
                            onChangeFn={ ({target})=> parseInt(target.value) >= 1 && parseInt(target.value) <= 10 && setGrade(target.value) }
                            value={grade}
                            classes='rounded-lg w-10'
                            placeholder='Grade the answer'
                        />
                    </div>

                    <div className='mt-4'>
                        <Input
                            type='text'
                            onChangeFn={({target})=> setComment(target.value)}
                            value={comment}
                            classes='rounded-lg w-full'
                            placeholder='Comment'
                        />
                    </div>

                    <Button handleOnClick={() => handleGradingAnswer(answer._id as string)} primary classes="rounded-lg mt-10" disabled={loading} loading={loading}>
                        Submit
                    </Button>

                    {error && (
                        <p className='text-red-500 mt-4'>{error}</p>
                    )}
                </div>
            ))            
        )}
    </div>
  )
}

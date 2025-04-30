import { Button } from '@/components'
import { submitAnswer } from '@/services/sanity'
import { useUser } from '@/store'
import { Question } from '@/types'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  question: Question
}

export default function AnswerFields({question}: Props) {
  
  const [answer, setAnswer] = useState("")
  const [loading, setIsLoading] = useState(false)

  const {userId, profileId} = useUser()

  const handleSubmitAnswer = async () => {
    try {
      setIsLoading(true)
      await submitAnswer(answer, userId as string, profileId as string, question)
      setAnswer("")
      toast.success("answer submitted successfully")
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mt-4'>
      <textarea
        placeholder='Write your answer here'
        value={answer}
        onChange={({target}) => setAnswer(target.value)}
        className='w-full border border-black rounded-lg p-2 outline-primary'
        rows={10}
      >
      </textarea>

      <div className='mt-4'>
        <Button
          handleOnClick={handleSubmitAnswer}
          primary
          classes={"rounded-lg w-full md:w-fit"}
          disabled={loading}
          loading={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

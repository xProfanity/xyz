"use client"

import { Button, DataSection } from '@/components'
import { fetchQuestions } from '@/services/sanity'
import { useUser } from '@/store'
import { Question } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

export default function Tutor() {
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [loading, setIsLoading] = useState(true)
  

  const {userId, name} = useUser((state) => state)
  const router = useRouter()

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setIsLoading(true)
        const questions = await fetchQuestions(userId)

        setQuestions(questions)
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsLoading(false)
      }
    }

    getQuestions()
  }, [userId])
  return (
    <section className='flex flex-col justify-start items-start'>
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='p-4 '>
          <h1 className='poppins-bold text-lg'>Hello, {name}</h1>
          <p className='text-gray-400'>form, submit questions, and grade answers on this platform</p>
        </div>

        <Button handleOnClick={()=> router.push("/instructor/create")} primary classes="rounded-lg hidden md:block">
          form questions
        </Button>
      </div> 

      <div className='p-4  mt-4 w-full'>
        {
          loading ? (
            <div className='flex flex-row'>
              <Skeleton
                baseColor='#e5e7eb'
                count={3}
                direction='ltr'
                inline
                borderRadius={10}
                enableAnimation
                width={380}
                height={180}
                containerClassName='flex gap-4'
              />
            </div>
          ) : (
            <>
              {!!questions?.length ? (
                <DataSection data={questions as any[]} />
              ) : (
                <p className='text-gray-400'>Create questions and find them here</p>
              )}
            </>
          )
        }
      </div>
    </section>
  )
}

"use client"

import { Button, DataSection } from '@/components'
import { fetchLectureById, fetchLectures, fetchLecturesByLecture} from '@/services/sanity'
import { useUser } from '@/store'
import { Lecture } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

export default function Lectures() {
    const [loading, setIsLoading] = useState(true)
      const [lectures, setLectures] = useState<Lecture[] | null>(null)
  
      const {userId} = useUser()
      const router = useRouter()
  
      useEffect(() => {
          const loadLectures = async () => {
              try {
                  setIsLoading(true)
                  const response = await fetchLecturesByLecture(userId?.toString() as string)
  
                  setLectures(response)
                  console.log('response', response)
              } catch (error) {
                  console.log('error', error)
              } finally {
                  setIsLoading(false)
              }
          }
  
          loadLectures()
      }, [])
    return (
      <section className='flex flex-col justify-start items-start'>
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='p-4 '>
                <h1 className='poppins-bold text-lg'>Manage lectures</h1>
                <p className='text-gray-400'>add lectures and engage students paticipations</p>
              </div>
  
              <div>
                  <Button handleOnClick={() => router.push("/instructor/lecture")} primary classes={"rounded-lg"}>
                      + Add lecture
                  </Button>
              </div>
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
                      {!!lectures?.length ? (
                          <DataSection data={lectures as any[]} />
                      ) : (
                          <p className='text-gray-400'>Added lectures will appear here</p>
                      )}
                      </>
                  )
              }
           </div> 
          </section>
    )
}

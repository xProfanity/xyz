"use client"
import { fetchLecturesByEducationType } from '@/services/sanity'
import { useTabs, useUser } from '@/store'
import { Lecture } from '@/types'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'sonner'

export default function Lectures() {
    const [lectures, setLectures] = useState<Lecture[] | null>(null)
    const {active} = useTabs()

    const [fetching, setFetching] = useState(false)

    const {studentType: educationType, course, form} = useUser()
    useEffect(() => {
        const handleFetchLectures = async () => {
        try {
            setFetching(true)
            const response = await fetchLecturesByEducationType(educationType as string, form, course)
            setLectures(response)
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
        
        {lectures?.map((lecture, index) => (
          <Link href={`/lecture/${lecture._id}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col p-4">
            <h1>{lecture.title}</h1>

            <div className="mt-2">
              <p className="font-bold text-lg">{lecture.subject || lecture.course}</p>
            </div>

            <p className="mt-2 text-gray-400">{dayjs(lecture._createdAt).format("DD MMMM, YYYY")}</p>
          </Link>
        ))}
        {fetching && (
          [...Array(4)].map((_, index) => (
            <Skeleton height={500} width={300} className="rounded-lg" />
          ))
        )}
    </div>
  )
}

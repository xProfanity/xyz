"use client"

import { useUser } from '@/store'
import { Lecture } from '@/types'
import dayjs from 'dayjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

interface Props {
    data: Lecture[]
    subject: string
}

export default function FetchedData({data, subject}: Props) {

    const [fetching, setFetching] = useState(false)

    const {studentType} = useUser()

    const pathname = usePathname()

    useEffect(() => {
        if(!data) {
            setFetching(true)
        }

        setFetching(false)
    }, [data])

  return (
    <div className="flex flex-row flex-wrap justify-center items-center md:justify-normal md:items-start gap-4 w-full mt-4">
        {data?.map((lecture, index) => (
          <Link href={`/lecture/${lecture._id}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col p-4">
            <h1>{lecture.title}</h1>

            <div className="mt-2">
              <p className="font-bold text-lg">{lecture.subject || lecture.course}</p>
            </div>

            <p className="mt-2 text-gray-400">{dayjs(lecture._createdAt).format("DD MMMM, YYYY")}</p>
          </Link>
        ))}
        {data.length === 0 && (
            <h1 className='text-lg text-gray-400'>No {studentType === "professional" ? 'courses' : "classes"} found for <span className='capitalize'>{subject}</span> yet</h1>
        )}
        {fetching && (
          [...Array(4)].map((_, index) => (
            <Skeleton height={500} width={300} className="rounded-lg" />
          ))
        )}
    </div>
  )
}

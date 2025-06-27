"use client"

import { useUser } from '@/store'
import { Lecture, Question, Resource } from '@/types'
import { SanityDocument } from '@sanity/client'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiDownload } from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton'

type Combine = Partial<SanityDocument> & {
  title?: string
  question?: string
  subject: string
  course: string
  document?: {
    description: string
    author: string
    notes: string
    cover: {
      coverUrl: string | null
      coverName: string | null
      fileName: string
      fileUrl: string
    }
  }
}

interface Props {
    data: Combine[]
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
        {!fetching && (
          data?.map((lecture, index) => (
            <Link href={`/${lecture?._type}/${lecture?._id}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col p-4">
              <h1>{lecture?.title}</h1>

              {lecture.document?.cover?.coverUrl && (
                <div className='w-full h-[150px] relative'>
                  <Image
                    src={lecture.document?.cover?.coverUrl!}
                    fill
                    alt="document cover"
                    className='object-cover rounded-lg'
                  />
                </div>
              )}

              <div className="mt-2">
                <p className="font-bold text-lg">{lecture.subject || lecture.course}</p>
              </div>

              {lecture.document?.notes && (
                <p className='text-gray-500'>{lecture.document.notes}</p>
              )}

              {lecture._type === "question" && (
                <p className='text-gray-500'>{lecture?.question}</p>
              )}

              <div className='w-full flex flex-row justify-between items-center'>
                <p className="mt-2 text-gray-400">{dayjs(lecture._createdAt).format("DD MMMM, YYYY")}</p>

                {lecture._type === "resource" && (
                  <Link href={`${lecture.document?.cover.fileUrl!}?dl=${lecture.document?.cover.fileName!}`}>
                    <BiDownload size={35} />
                  </Link>
                )}
              </div>
          </Link>
        ))
        )}

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

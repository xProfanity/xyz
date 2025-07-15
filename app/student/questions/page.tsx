"use client"

import { fetchSubjectsByEducationType } from '@/services/sanity'
import { useTabs, useUser } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'sonner'

interface Subject {
  subjectName: string
  picture: string
}

export default function Questions() {
    const [subjects, setSubjects] = useState<Subject[] | null>(null)
    const {active} = useTabs()

    const [fetching, setFetching] = useState(false)

    const {studentType: educationType} = useUser()


    useEffect(() => {
        const handleFetchSubjects = async () => {
        try {
            setFetching(true)
            const response = await fetchSubjectsByEducationType(educationType as string)
            setSubjects(response)
        } catch (error) {
            console.log('error', error)
            toast.error("error fetching subjects")
        } finally {
            setFetching(false)
        }
        }

        handleFetchSubjects()
    }, [])
  return (
    <div className="flex flex-row flex-wrap justify-between gap-4 w-full mt-4 px-8">
        
        
        {subjects?.map((subject, index) => (
          <Link href={`/student/questions/${subject.subjectName?.toLowerCase()}`} key={index} className='w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col justify-between items-start p-4'>
              <Image
                src={subject.picture}
                height={180}
                width={400}
                alt={`${subject.subjectName} logo`}
                className='object-cover rounded-lg'
              />
            <h1 className='font-semibold text-lg mt-5'>{subject.subjectName}</h1>
          </Link>
        ))}
        
        {/* {lectures?.map((lecture, index) => (
          <Link href={`/lecture/${lecture._id}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col p-4">
            <h1>{lecture.title}</h1>

            <div className="mt-2">
              <p className="font-bold text-lg">{lecture.subject || lecture.course}</p>
            </div>

            <p className="mt-2 text-gray-400">{dayjs(lecture._createdAt).format("DD MMMM, YYYY")}</p>
          </Link>
        ))} */}
        {fetching && (
          [...Array(4)].map((_, index) => (
            <Skeleton height={150} width={300} className="rounded-lg" />
          ))
        )}
    </div>
  )
}

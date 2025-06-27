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

export default function Books() {
    const [subjects, setSubjects] = useState<Subject[] | null>(null)

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
    <div className="flex flex-row flex-wrap justify-center items-center md:justify-normal md:items-start gap-4 w-full mt-4">
        {subjects?.map((subject, index) => (
          <Link href={`/student/books/${subject.subjectName?.toLowerCase()}`} key={index} className='w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col justify-center items-start p-4'>
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
        {fetching && (
          [...Array(4)].map((_, index) => (
            <Skeleton height={150} width={300} className="rounded-lg" />
          ))
        )}
    </div>
  )
}

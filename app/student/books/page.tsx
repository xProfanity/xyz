"use client"

import { fetchResourcesByEducationType } from '@/services/sanity'
import { useTabs, useUser } from '@/store'
import { Resource } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'sonner'

export default function Books() {
  const [resources, setResources] = useState<Resource[] | null>(null)
  
    const [fetching, setFetching] = useState(false)
  
    const {studentType: educationType, course, form} = useUser()

    console.log('resources', resources)

    useEffect(() => {
      const handleFetchLectures = async () => {
        try {
          setFetching(true)
          const response = await fetchResourcesByEducationType(educationType as string, form, course)
          setResources(response)
          console.log("fetched something");
          
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
          {resources?.map((resource, index) => (
            resource.document.cover.coverUrl ? (
              <Link href={`${resource.document.cover.fileUrl}/?dl=lecture-${resource.document.cover.fileName}`} className="relative rounded-lg cursor-pointer">
                <div className="relative h-[200px] w-[350px]">
                  <Image
                    src={resource.document.cover.coverUrl!}
                    alt={resource.document.cover.coverName!}
                    fill
                    className="object-fill rounded-lg"
                  />
                </div>
              </Link>
            ) : (
              <Link href={`${resource.document.cover.fileUrl}/?dl=lecture-${resource.document.cover.fileName}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col justify-between p-4">
                <h1>{resource.title}</h1>
  
                {/* <div>
                  <div className="mt-2">
                    <p className="font-bold text-lg">{resource..subject || question.course}</p>
                  </div>
                  <div className="mt-2 flex flex-row justify-between items-center">
                    <p className="text-gray-400">{dayjs(question._createdAt).format("DD MMMM, YYYY")}</p>
                    <p>{question.submissions?.length || 0} answer{question.submissions?.length !== 1 && 's'}</p>
                  </div>
                </div> */}
              </Link>
            )
          ))}
          {fetching && (
            [...Array(4)].map((_, index) => (
              <Skeleton height={500} width={300} className="rounded-lg" />
            ))
          )}
      </div>
  )
}

"use client"

import { Button, DataSection } from '@/components'
import { fetchResources } from '@/services/sanity'
import { useUser } from '@/store'
import { Resource } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

export default function Resources() {
    const [loading, setIsLoading] = useState(true)
    const [resources, setResources] = useState<Resource[] | null>(null)

    const {userId} = useUser()
    const router = useRouter()

    useEffect(() => {
        const loadResources = async () => {
            try {
                setIsLoading(true)
                const response = await fetchResources(userId?.toString() as string)

                setResources(response)
            } catch (error) {
                console.log('error', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadResources()
    }, [])
  return (
    <section className='flex flex-col justify-start items-start'>
          <div className='flex flex-row justify-between items-center w-full'>
            <div className='p-4 '>
              <h1 className='poppins-bold text-lg'>Manage resources</h1>
              <p className='text-gray-400'>add resources, notes, attach documents for students' work</p>
            </div>

            <div>
                <Button handleOnClick={() => router.push("/instructor/resource")} primary classes={"rounded-lg"}>
                    + Add resource
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
                    {!!resources?.length ? (
                        <DataSection data={resources as any[]} />
                    ) : (
                        <p className='text-gray-400'>Added resources will appear here</p>
                    )}
                    </>
                )
            }
         </div> 
        </section>
  )
}

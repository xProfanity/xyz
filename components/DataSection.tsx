"use client"

import { Answer } from '@/types'
import { SanityAssetDocument } from '@sanity/client'
import { useRouter } from 'next/navigation'
import React from 'react'

type SanityData = Partial<Answer>

interface Props {
    header: string
    description: string
    data: SanityData[]
}

export default function DataSection({header, description, data}: Props) {
  
    const router = useRouter()

    return (
    <div>
        <div>
            <h1 className='poppins-bold text-lg'>{header}</h1>
            <p className='text-gray-400 '>{description}</p>
        </div>

        <div className='flex flex-row flex-wrap gap-4 mt-4'>
            {data?.map((data, index) => (
                <div key={index} onClick={() => router.push(`/question/${data._id}`)} className='p-2 bg-white hover:bg-primary/35 cursor-pointer rounded-lg shadow shadow-primary/60 max-w-[450px]'>
                    {data._type === "question" && (
                        <div className='min-h-[180px] flex flex-col justify-between'>
                            <div className='flex flex-col sm:flex-row sm:justify-between'>
                                <h1 className={`${data.course ? 'uppercase' : 'capitalize'} poppins-semibold text-primary`}>{data.course || data.subject}</h1>
                                <h1 className='capitalize text-gray-400'>{data.form || data.level}</h1>
                            </div>
                            <h1 className='poppins-semibold '>{data.question}</h1>

                            <div className='flex flex-row justify-between text-gray-400'>
                                <h1 className=''>{data.submissions?.length || 0} answer{data.submissions?.length !== 1 && 's'}</h1>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}

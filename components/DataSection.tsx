"use client"

import { Answer } from '@/types'
import { SanityAssetDocument } from '@sanity/client'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiDownload } from 'react-icons/bi'

type SanityData = Partial<Answer> & {
    title: string
    resourceName: string
    resourceUrl: string
    document: {
        file: SanityAssetDocument
        notes: string
        description: string
        author: string
    }
}

interface Props {
    data: SanityData[]
}

export default function DataSection({data}: Props) {
  
    const router = useRouter()

    console.log('data', data)

    return (
    <div>
        <div className='flex flex-row flex-wrap gap-4 mt-4'>
            {data?.map((data, index) => (
                <div key={index} className='p-2 bg-white rounded-lg shadow shadow-primary/60 max-w-[450px]'>
                    {data._type === "question" && (
                        <div onClick={() => router.push(`/${data._type}/${data._id}`)} className='min-h-[180px] hover:bg-primary/35 cursor-pointer flex flex-col justify-between'>
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
                    {data._type === "resource" && (
                        <div className='min-h-[180px] flex flex-col justify-between'>
                            <div>
                                <h1 className='poppins-semibold text-primary'>{data.title}</h1>
                            </div>

                            <div className='py-10'>
                                <p className='text-ellipsis'>{data.document.notes}</p>
                            </div>

                            <div className='flex flex-row justify-between items-center'>
                                <h1 className='text-gray-400'>{dayjs(new Date(data._createdAt!)).format("DD MMMM, YYYY")}</h1>
                                <Link href={`${data.resourceUrl}/?dl=lecture-${data.resourceName}`}>
                                    <BiDownload size={25} />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}

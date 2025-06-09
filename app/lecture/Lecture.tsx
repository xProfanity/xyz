"use client"

import { useUser } from '@/store'
import { Lecture} from '@/types'
import dayjs from 'dayjs'
import { div } from 'framer-motion/client'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CgAttachment } from 'react-icons/cg'
import { FiFileText } from 'react-icons/fi'

export default function LectureDetails({lecture}: {lecture: Lecture}) {
    
    const {role} = useUser()

    console.log('lecture', lecture)

    return (
    <div>
        <h1 className='poppins-bold md:poppins-black text-xl md:text-6xl'>{lecture.title}</h1>
        <p className='text-gray-400 mt-4'>{dayjs(new Date(lecture._createdAt as Date)).format("DD MMMM, YYYY")}</p>


        <div className='flex flex-row justify-between items-center mt-4'>
            {/* <h1 className={`${question.course ? 'uppercase' : 'capitalize'}`}>{question.course || question.subject}</h1>
            <h1 className={`capitalize`}>{question.level || question.form}</h1> */}
        </div>

        {/* {
            role?.toLocaleLowerCase() === 'instructor' && (
                <AnswerCards submissions={question.submissions} questionId={question._id as string} />
            )
        }
        {
            role?.toLowerCase() === "student" && (
                <AnswerFields question={question} />
            )
        } */}

        <div className='flex flex-col gap-4'>
            {lecture.content.map((block, i) => {
                
                return <>
                        {block._type === "block" && block.style === 'normal' && (
                            block.children?.map((text, index) => (
                                <p key={index} className='text-xl whitespace-pre-wrap'>{text.text}</p>
                            ))
                        )}
                        {
                            block._type === 'block' && block.style === 'h1' && (
                                block.children?.map((text, index) => (
                                    <h1 key={index} className='text-2xl font-bold'>{text.text}</h1>
                                ))
                            )
                        }
                        {block._type === "image" && 
                            <div className='relative w-full h-[350px]'>
                                <Image
                                    src={block.fileUrl!}
                                    alt={block.filename!}
                                    fill
                                    className='object-contain'
                                />
                            </div>
                        }
                        {block._type === "file" && (
                            <div className='h-[200px] w-full rounded-lg relative bg-gray-200'>
                                <div className='h-full w-full flex flex-col justify-center items-center'>
                                    <CgAttachment size={50*2} color='gray' />
                                </div>
                                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center items-center gap-2'>
                                    <FiFileText size={30} />
                                    <p className='text-2xl font-bold'>{block.filename}</p>
                                </div>
                            </div>
                        )}
                </>
                    })
                }
        </div>
    </div>
  )
}

"use client"

import { Button } from '@/components'
import { submitParticipation } from '@/services/sanity'
import { useUser } from '@/store'
import { Lecture, Participation} from '@/types'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiPaperPlane } from 'react-icons/bi'
import { CgAttachment } from 'react-icons/cg'
import { FiFileText } from 'react-icons/fi'
import { toast } from 'sonner'

export default function LectureDetails({lecture}: {lecture: Lecture}) {
    
    const {role, userId, name} = useUser()

    const [participation, setParticipation] = useState("")
    const [sending, setSending] = useState(false)
    const [participations, setParticipations] = useState<Participation[]>([])

    const sendParticipation = async () => {
        try {
            setSending(true)
            await submitParticipation(name as string, participation, lecture._id as string, lecture._id === userId)

            const newParticipations = [...participations, {name, content: participation, _key: ''}]

            setParticipations(newParticipations as Participation[])
            setParticipation("")
            toast.success("successfully contributed to the lesson")
        } catch (error) {
            console.log('error', error)
        } finally {
            setSending(false)
        }
    }

    useEffect(() => {
        const fetchParticipations = () => {
            setParticipations(lecture?.participations! || [])
        }

        fetchParticipations()
    }, [])

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
                
                return <div key={i}>
                        {block._type === "block" && block.style === 'normal' && (
                            block.children?.map((text, index) => (
                                <p key={index} className='text-lg md:text-xl whitespace-pre-wrap'>{text.text}</p>
                            ))
                        )}
                        {
                            block._type === 'block' && block.style === 'h1' && (
                                block.children?.map((text, index) => (
                                    <h1 key={index} className='text-2xl font-bold'>{text.text}</h1>
                                ))
                            )
                        }
                        {
                            block._type === 'block' && block.style === 'h2' && (
                                block.children?.map((text, index) => (
                                    <h2 key={index} className='text-xl font-semibold'>{text.text}</h2>
                                ))
                            )
                        }
                        {
                            block._type === 'block' && block.style === 'blockquote' && (
                                block.children?.map((text, index) => (
                                    <div key={index} className='bg-gray-200 p-2 border-s-2 border-primary'>
                                        <p className='text-primary cursor-pointer hover:text-primary/80'>{text.text}</p>
                                    </div>
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
                </div>
                    })
                }
        </div>

        <div className='flex flex-col gap-4 mt-10'>
            <h1 className='text-2xl font-bold'>Participations</h1>

            <div className='flex flex-col gap-6'>
                {participations.length === 0 ? (
                    <p className='text-gray-400 text-sm'>No student posted a comment or question yet.</p>
                ) : (
                    participations.map((participation, index) => (
                        <div key={index} className='flex flex-col justify-start items-start'>
                            <div className='flex flex-row justify-start items-center gap-4'>
                                <h1 className={`font-bold text-xl ${participation.lecture ? 'text-orange-500' : 'text-primary'} capitalize`}>{participation.name}</h1>
                                <span className='text-gray-400 text-xs'>{dayjs(participation.createdAt).format("DD MMMM, YYYY")}</span>
                            </div>
                            <p className='whitespace-pre-line mt-2'>{participation.content}</p>
                        </div>
                    ))
                )}
            </div>

            <div className='flex flex-col justify-center items-start gap-2 pb-20'>
                <textarea
                    className='border w-full rounded-lg p-4'
                    placeholder={"add a comment or a question here..."}
                    rows={3}
                    value={participation}
                    onChange={({target}) => setParticipation(target.value)}
                ></textarea>

                <Button handleOnClick={sendParticipation} primary disabled={participation === "" || sending} loading={sending} classes={"flex flex-row gap-2 rounded-lg mt-2"}>
                    <span>Send</span>
                    <BiPaperPlane size={35} />
                </Button>
            </div>
        </div>
    </div>
  )
}

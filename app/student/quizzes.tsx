"use client"

import useSchool from "@/hooks/useSchool"
import { fetchQuizQuestionBySubject, submitAnswer } from "@/services/sanity"
import { Question } from "@/types"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CgMaximize } from "react-icons/cg"
import { LuPlaneTakeoff } from "react-icons/lu"
import { PiPaperPlane } from "react-icons/pi"

interface SubjectsProps {
    educationType: "professional" | "secondary" | undefined
    userId?: string | undefined
    profileId?: string | undefined
  }
  
export const Quizzes = ({educationType, userId, profileId}: SubjectsProps) => {
    const {getSubjects: subjects} = useSchool()
    const [quiz, setQuiz] = useState<Question | null>(null)
    const [activeSubject, setActiveSubject] = useState("")
  
    const [isLoading, setIsLoading] = useState(false)
    const [sending, setIsSending] = useState(false)
  
    const [answer, setAnswer] = useState("")
  
    const handleSendAnswer = async () => {
      try {
        setIsSending(true)
        await submitAnswer(
          answer,
          userId as string,
          profileId as string,
          quiz as Question
        )
  
        await handleSetQuiz(activeSubject)
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsSending(false)
      }
    }
  
    const handleSetQuiz = async (subject: string) => {
      try {
        setIsLoading(true)
        const response = await fetchQuizQuestionBySubject(subject, userId as string)
        setActiveSubject(subject)
        setQuiz(response)
        setAnswer("")
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsLoading(false)
      }
    }
  
    useEffect(() => {
      const getQuiz = async () => {
        await handleSetQuiz(subjects(educationType)?.[0].subject as string)
      }
  
      getQuiz()
    }, [])
  
    return (
      
      <div className="flex flex-row flex-wrap gap-2">
        {!subjects(educationType) ? (
          <p>Loading ...</p>
        ) : (
          subjects(educationType)?.map(({subject}, index) => (
            <button key={index} className={`py-2 px-4 rounded-full ${activeSubject === subject ? 'bg-[#EFB9EE]' : 'bg-black'} cursor-pointer`} onClick={()=>handleSetQuiz(subject)}>
              <p className="text-white text-lg font-semibold">{subject}</p>
            </button>
          ))
        )}
  
        {
          subjects(educationType) && !isLoading && (
            !quiz ? (
              <p className="text-gray-400 text-lg mt-2">Select a subject to start quick Quizzes</p>
            ) : (
              <div>
                <p className="text-gray-500 text-lg mt-2">{quiz.question}</p>
  
                <div className="inline-flex w-full">
                  <input
                    type="text"
                    className="border-b border-black p-1 mt-4 w-full outline-none"
                    placeholder="Write your answer here"
                    value={answer}
                    onChange={({target}) => setAnswer(target.value)}
                  />
  
                  <button
                    className="border-b border-black cursor-pointer outline-0 hidden md:block"
                  >
                    <Link
                      href={`/question/${quiz._id}`}
                    >
                      <CgMaximize size={30} color="gray" />
                    </Link>
                  </button>
  
                  <button
                    type="button"
                    className="border-b border-black cursor-pointer outline-0"
                    disabled={answer === "" || sending}
                    onClick={handleSendAnswer}
                  >
                    {sending ? (
                      <>
                        <LuPlaneTakeoff size={30} color={"#D991B7"} />
                      </>
                    ) : (
                      <>
                        <PiPaperPlane size={30} color={answer ? "#D991B7" : "gray"} className="rotate-90" />
                      </>
                    )}
                  </button>
                </div>
              </div> 
            )
          )
        }
        {
          isLoading && (
            <p className="text-gray-400 text-lg mt-2">Loading ...</p>
          )
        }
      </div>
    )
  }
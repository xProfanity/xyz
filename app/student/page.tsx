"use client"

import { useTabs, useUser } from "@/store";
import { Statistics } from "./statistics";
import { WorkField } from "./workfield";
import { Schedules } from "./schedule";
import { div } from "framer-motion/client";
import { useEffect, useState } from "react";
import { fetchLectures, fetchLecturesByEducationType } from "@/services/sanity";
import { toast } from "sonner";
import { Lecture } from "@/types";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import dayjs from "dayjs";

export default function Home() {
  
  const {active} = useTabs()
  


  return (
    <>
    {active === "all" &&<TabsAll />}
    {active === "books" && <TabsBooks />}
    {active === "lectures" && <TabsLectures />}
    {active === "quizzes" && <TabsQuizzes />}
    </>
  )
}

const TabsAll = () => {
  const {studentType, profileId, userId} = useUser((state) => state)
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-5 gap-4 mt-4 h-full">
      <div className="col-span-2 hidden md:block">
        <Statistics studentType={studentType} />
      </div>
      <div className="col-span-3 bg-[#F0EFF4] rounded-3xl flex flex-col lg:grid lg:grid-cols-2 p-6 gap-4 h-full">
        <div className="col-span-1">
          <WorkField studentType={studentType} profileId={profileId} userId={userId} />
        </div>
        <div className="hidden md:block md:col-span-1">
          <Schedules studentType={studentType} />
        </div>
      </div>
    </div>
  )
}

const TabsLectures = () => {

  const [lectures, setLectures] = useState<Lecture[] | null>(null)
  const {active} = useTabs()

  const [fetching, setFetching] = useState(false)

  const {studentType: educationType} = useUser()

  console.log('lectures', lectures)

  useEffect(() => {
    const handleFetchLectures = async () => {
      try {
        setFetching(true)
        const response = await fetchLecturesByEducationType(educationType as string)
        setLectures(response)
      } catch (error) {
        console.log('error', error)
        toast.error("error fetching lectures")
      } finally {
        setFetching(false)
      }
    }

    if(active === "lectures") {
      handleFetchLectures()
    }
  }, [active])

  return (
    <div className="flex flex-row flex-wrap gap-4 w-full mt-4">
        {lectures?.map((lecture, index) => (
          <Link href={`/lecture/${lecture._id}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col p-4">
            <h1>{lecture.title}</h1>

            <div className="mt-2">
              <p className="font-bold text-lg">{lecture.subject || lecture.course}</p>
            </div>

            <p className="mt-2 text-gray-400">{dayjs(lecture._createdAt).format("DD MMMM, YYYY")}</p>
          </Link>
        ))}
        {fetching && (
          [...Array(4)].map((_, index) => (
            <Skeleton height={500} width={300} className="rounded-lg" />
          ))
        )}
    </div>
  )
}

const TabsBooks = () => {
  return (
    <div>Books</div>
  )
}

const TabsQuizzes = () => {
  return (
    <div>Quizzes</div>
  )
}
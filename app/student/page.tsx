"use client"

import useSchool from "@/hooks/useSchool";
import { useUser } from "@/store";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { HiBookOpen } from "react-icons/hi";

export default function Home() {
  const {studentType} = useUser((state) => state)

  return (
      <div className="flex flex-col-reverse md:grid md:grid-cols-5 gap-4 mt-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-1 flex flex-col justify-center items-center gap-3 sm:gap-5 rounded-3xl bg-[#E4F5E0] bg-[url('/certificate.svg')] relative bg-cover bg-left-bottom bg-no-repeat sm:h-56">
              <span className="poppins-bold text-3xl sm:text-6xl">0</span>
              <h1 className="text-gray-600 text-xs sm:text-base">Certificates</h1>

            </div>
            <div className="col-span-1 flex flex-col justify-center items-center gap-3 sm:gap-5 rounded-3xl bg-[#F9EFDE] bg-[url('/category.svg')] relative bg-cover bg-left-bottom bg-no-repeat sm:h-56">
              <span className="poppins-bold text-3xl sm:text-6xl">0</span>
              <h1 className="text-gray-600 text-xs sm:text-base">{studentType?.toLowerCase() === "professional" ? 'courses' : 'subjects'}</h1>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center gap-3 sm:gap-5 rounded-3xl bg-[#F3DEFA] bg-[url('/time.svg')] relative bg-cover bg-left-bottom bg-no-repeat sm:h-56">
              <span className="poppins-bold text-3xl sm:text-6xl">0</span>
              <h1 className="text-gray-600 text-xs sm:text-base">hours</h1>
            </div>
          </div>

          <div className="col-span-3 rounded-3xl h-36 p-4 bg-[#ECDEFA] bg-[url('/flower.svg')] relative bg-cover bg-left-bottom bg-no-repeat">
            <h1 className="inline-flex gap-2 justify-center items-center poppins-semibold"><span><HiBookOpen size={35} color="#4D417C" /></span> Learnings today</h1>

            <h1 className="poppins-semibold text-xl"><span className="poppins-bold text-6xl">0</span> min</h1>
          </div>

          <div className="col-span-3 h-40 p-4 bg-[#F7D5EA] rounded-3xl bg-[url('/yflower.svg')] relative bg-contain bg-right-bottom bg-no-repeat">
            <h1 className="poppins-bold text-3xl">Topics covered</h1>
            <h1 className="poppins-semibold"><span className="poppins-bold text-6xl">0</span> topics</h1>
          </div>

          <div className="col-span-3 h-40 -mt-14 p-4 bg-[#E4DFFF] rounded-3xl bg-[url('/yflower.svg')] relative bg-contain bg-right-bottom bg-no-repeat"> 
            <h1 className="poppins-bold text-3xl">Tutors interacted with</h1>
            <h1 className="poppins-semibold"><span className="poppins-bold text-6xl">0</span> tutors</h1>
          </div>
        </div>
        <div className="col-span-3 bg-[#F0EFF4] rounded-3xl flex flex-col lg:grid lg:grid-cols-2 p-6 gap-4">
          <div className="col-span-1">
            <div className="bg-[#F7D5EA] pb-10 rounded-3xl w-full p-4 flex flex-col justify-start items-start gap-4">
              <div className="flex w-full flex-row justify-between items-center poppins-semibold">
                <h1>Progress</h1>
                <h1><span>0</span>%</h1>
              </div>

              <div className="bg-[#F0C6DB] w-full relative h-2 rounded-3xl overflow-hidden">
                <div className="bg-[#312829] h-2 w-[0%]"></div>
              </div>
  
              <div className="mt-10 bg-[#F4C5DF] h-64 lg:h-72 w-64 lg:w-72 rounded-full mx-auto hidden sm:flex flex-col justify-center items-center">
                <HiBookOpen color="#D991B7" className="-mt-20 h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]" />

                <p className="text-gray-600 -mt-10">Consistency is the key</p>
              </div>
            </div>

          <div>
            <Quizzes educationType={studentType} />
          </div>
          </div>
          <div className="col-span-1">
            <WeekDates />
            <div>core results</div>
            <div>schedules</div>
            <div>activities</div>
          </div>
        </div>
      </div>
  );
}

interface DaysOfTheWeek {
  day: string
  date: number
  month: string
  isToday: boolean
}

const WeekDates = () => {
  
  const [daysOfTheWeek, setDaysOfTheWeek] = useState<DaysOfTheWeek[]>([])

  useEffect(() => {
    const getDaysOfTheWeek = () => {
      const daysOfTheWeek = [...new Array(5)].map((_, index) => {

        const d = dayjs().add(((index) - dayjs().day())+1, 'days')

        return ({
          day: d.format('ddd'),
          date: d.date(),
          month: d.format('MMM'),
          isToday: dayjs().day() === index+1
        })
      })

      setDaysOfTheWeek(daysOfTheWeek)
    }

    getDaysOfTheWeek()
  }, [])

  return (
    <div className="flex flex-row flex-wrap justify-between items-center gap-2">
      {
      daysOfTheWeek.length > 1 ? (
        daysOfTheWeek.map((day, index) => (
          <div key={index}
              className={`${day.isToday && 'bg-black text-white'} p-2 rounded-xl flex flex-col justify-center items-center bg-[#E6E4F0] flex-1`}
            >
                <p>{day.day}</p>
                <p>{day.date}</p>
                <p>{day.month}</p>
          </div>
        ))
      ) : (
        <p>Loading ...</p>
      )
      }
    </div>
  )
}

interface QuizzesProps {
  educationType: "professional" | "secondary"
}

const Quizzes = ({educationType}: QuizzesProps) => {
  const {getSubjects: subjects} = useSchool(educationType)

  return (
    
    <div>
      {subjects().map((subject, index) => (
        <p>{subject}</p>
      ))}
    </div>
  )
}
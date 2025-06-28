"use client"

import dayjs from "dayjs"
import { useEffect, useState } from "react"

interface DaysOfTheWeek {
  day: string
  date: number
  month: string
  isToday: boolean
}

export const WeekDates = () => {
  
  const [daysOfTheWeek, setDaysOfTheWeek] = useState<DaysOfTheWeek[]>([])

  useEffect(() => {
    const getDaysOfTheWeek = () => {
      const daysOfTheWeek = [...new Array(7)].map((_, index) => {

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
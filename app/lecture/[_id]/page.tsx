import { fetchLectureById, fetchLectures } from '@/services/sanity'
import { Lecture } from '@/types'
import React from 'react'
import LectureDetails from '../Lecture'

export async function generateStaticParams() {
        const lectures = await fetchLectures() as Lecture[]
        
        return lectures.map((lecture) => ({
            _id: lecture._id,
        }))
}

export default async function Layout({params}: {params: Promise<{_id: string}>}) {

    const {_id} = await params

    const lecture = await fetchLectureById(_id) as Lecture | null

    return (
    <div>
        {lecture ? (
            <LectureDetails lecture={lecture} />
        ) : (
            <p>Lecture not found</p>
        )
        }
    </div>
  )
}

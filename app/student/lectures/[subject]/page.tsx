import { courses, subjects } from "@/constants"
import { fetchLecturesBySubject } from "@/services/sanity"
import Link from "next/link"
import FetchedData from "../../FetchedData"

export async function getStaticParams() {
    [...subjects, ...courses].map((subject) => ({
        subject
    }))
}

export default async function Subjects({params}: {params: Promise<{subject: string}>}) {
    const {subject} = await params
    const lectures = await fetchLecturesBySubject(subject)
  return (
    <FetchedData data={lectures} subject={subject} />
  )
}

import { fetchQuestionsBySubject, fetchSubjects } from "@/services/sanity"
import FetchedData from "../../FetchedData"

interface Subject {
  subjectName: string
}

export async function generateStaticParams() {
  const subjects = await fetchSubjects() as Subject[]

  return subjects.map((subject) => ({
    subject: subject.subjectName
  }))
}

export default async function Books({params}: {params: Promise<{subject: string}>}) {
    const {subject} = await params
    const lectures = await fetchQuestionsBySubject(subject)
  return (
    <FetchedData data={lectures} subject={subject} />
  )
}

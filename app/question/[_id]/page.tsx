import { fetchAllQuestions, fetchQuestionById, fetchQuestions} from "@/services/sanity"
import { Question as QuestionType } from "@/types"
import QuestionDetail from "../QuestionDetail"

export async function generateStaticParams() {
  const questions = await fetchAllQuestions() as QuestionType[]

  return questions.map((question, index) => ({
    _id: question._id
  }))
}

export default async function Question({params}: {params: Promise<{_id: string}>}) {

  const {_id} = await params

  const question = await fetchQuestionById(_id)

  return (
    <>
      {question ? (
        <QuestionDetail question={question} />
      ) : (
       <p>No question found</p> 
      )}
    </>
  )
}

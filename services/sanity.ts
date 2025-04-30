import { Question } from "@/types"
import { client } from "@/utils/sanity"

export async function fetchAllQuestions() {
    const query = `*[_type == "question"]`

    const result = await client.fetch(query)

    return result
}

export async function fetchQuestionById(id: string) {
    const query = `*[_type == "question" && _id == "${id}"][0]`

    const result = await client.fetch(query)

    return result
}

export async function fetchQuestions(id: string | undefined) {
    console.log('id', id)
    const query = `*[_type == "question" && instructorId == "${id}"] | order(_createdAt)`

    const result = await client.fetch(query)

    return result
}

export async function fetchAnswers(id: string | undefined) {
    const query = `*[_type == "answer" && question -> instructorId == "${id}"] {
                        ...,
                        question -> {
                            question, educationType, course, level, form, subject
                        }
                    }
                `

    const result = await client.fetch(query)

    return result
}

export async function fetchAnswersByQuestion(questionId: string) {
    const query = `*[_type == "answer" && grade == null && question -> _id == "${questionId}"]`

    const result = await client.fetch(query)

    return result
}

export async function fetchQuizQuestionBySubject(subject: string, studentId: string) {

    const query = `*[_type == "question" && (course == "${subject.toLowerCase()}" || subject == "${subject.toLowerCase()}") && (submissions == null || !("${studentId.toString()}" in submissions))][0]`

    const result = await client.fetch(query)

    return result
}


export async function submitAnswer(answer: string, studentId: string, profileId: string, question: Question) {
    await client.create({
        _type: 'answer',
        answer,
        studentId: studentId.toString(),
        profileId: profileId.toString(),
        question: {
            _type: 'question',
            _ref: question._id
        }
    })

    await client
    .patch(question._id as string)
    .setIfMissing({submissions: []})
    .insert(
        "after",
        "submissions[-1]",
        [studentId.toString()]
    )
    .commit()
}

export async function gradeAnswer(answerId: string, comment: string, grade: number) {
    await client
        .patch(answerId)
        .set({comment, grade})
        .commit()
}

export async function createQuestion(
    question: string,
    educationType: string,
    subject: string | null,
    course: string | null,
    form: string | null,
    level: string | null,
    instructorId: string
) {
    const doc = {
        _type: 'question',
        question,
        educationType,
        subject,
        course,
        form,
        level,
        instructorId
    }

    await client.create(doc)
}
import { Question } from "@/types"
import { client } from "@/utils/sanity"
import { v4 as uuidv4 } from "uuid"

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

export async function fetchQuestionsByEducationType(educationType: string, form: string, course: string) {
    const query = `*[_type == "question" && educationType == "${educationType}" && (form == "${form?.toLowerCase()}" || course == "${course?.toLowerCase()}")]`

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

export async function fetchResources(author: string) {
    const query = `*[_type == "resource" && document.author == "${author}"]{
        ...,
        "resourceUrl": document.asset -> url,
        "resourceName": document.asset -> originalFilename
    }`

    const result = await client.fetch(query)

    return result
}

export async function fetchAllResources(id?: string | null) {
    const query = id ? `*[_type == "resource" && _id == "${id}"]` : `*[_type == "resource"]`

    const result = await client.fetch(query)

    return result
}

export async function fetchResourcesByEducationType(educationType: string, form: string | null | undefined, course: string | null | undefined) {
    const query = `*[_type == "resource" && educationType == "${educationType}" && (form == "${form?.toLowerCase()}" || course == "${course?.toLowerCase()}")] {
        ...,
        "document": {
            ...,
            "cover": {
                "coverUrl": document.cover.asset -> url,
                "coverName": document.cover.asset -> originalFilename,
                "fileUrl": document.asset -> url,
                "fileName": document.asset -> originalFilename
            }
        }
    }`

    const result = await client.fetch(query)

    return result
}

export async function submitResource(title: string, notes: string, description: string, file: string, userId: string, educationType: string, subject: string, course: string, form: string, level: string, thumb?: string) {
    const doc = {
        _type: 'resource',
        title,
        document: {
            notes,
            description,
            asset: {
                _type: 'reference',
                _ref: file
            },
            author: userId,
            cover: thumb ? {
                asset: {
                    _type: 'reference',
                    _ref: thumb
                }
            } : null
        },
        subject, course, form, level, educationType
    }

    await client.create(doc)
}

export async function submitLecture(content: any[], title: string, instructorId: string, educationType: string, subject: string, course: string, level: string, form: string) {
    const doc = {
        _type: 'lecture',
        title,
        content,
        instructorId,
        educationType, 
        subject,
        course,
        level,
        form
    }

    await client.create(doc)
}

export async function fetchLectures() {
    const query = `*[_type == "lecture"]`

    const result = await client.fetch(query)

    return result
}

export async function fetchLecturesByLecture(lectureId: string) {
    const query = `*[_type == "lecture" && instructorId == "${lectureId}"]`

    const result = await client.fetch(query)

    return result
}

export async function fetchLecturesByEducationType(educationType: string, form: string | null | undefined, course: string | null | undefined) {
    const query = `*[_type == "lecture" && educationType == "${educationType}" && (form == "${form?.toLowerCase()}" || course == "${course?.toLowerCase()}")]`

    const result = await client.fetch(query)

    return result
}

export async function fetchSubjectsByEducationType(educationType: string) {
    const query = `*[_type == "subject" && educationType == "${educationType}"] {
        ...,
        "picture": picture.asset -> url
    }`

    const result = await client.fetch(query)

    return result
}

export async function fetchLectureById(id: string) {
    const query = `*[_type == "lecture" && _id == "${id}"][0]{
        ...,
        "files": content[_type == "image" || _type == "file"] {
            "fileName": asset -> originalFilename,
            "fileUrl": asset -> url
        },
        content[] {
            ...,
            _type == "file" || _type == "image" => {
                "filename": asset -> originalFilename,
                "fileUrl": asset -> url
            }
        }
    }`

    const result = await client.fetch(query)

    return result
}

export async function fetchSubjects() {
    const query = `*[_type == "subject"]`

    const result = await client.fetch(query)

    return result
}

export async function fetchLecturesBySubject(subject: string) {
    const query = `*[_type == "lecture" && (subject == "${subject}" || course == "${subject}")]`

    const result = await client.fetch(query)

    return result
}

export async function fetchResourcesBySubject(subject: string) {
    const query = `*[_type == "resource" && (subject == "${subject}" || course == "${subject}")]{
        ...,
        "document": {
            ...,
            "cover": {
                "coverUrl": document.cover.asset -> url,
                "coverName": document.cover.asset -> originalFilename,
                "fileUrl": document.asset -> url,
                "fileName": document.asset -> originalFilename
            }
        }
    }`

    const result = await client.fetch(query)

    return result
}

export async function fetchQuestionsBySubject(subject: string) {
    const query = `*[_type == "question" && (subject == "${subject}" || course == "${subject}")]`

    const result = await client.fetch(query)

    return result
}

export async function submitParticipation(name: string, content: string, lectureId: string, lecture: boolean) {
    await client
        .patch(lectureId)
        .setIfMissing({participations: []})
        .insert(
            "after",
            "participations[-1]",
            [{name, content, lecture, _key: uuidv4()}]
        )
        .commit()
}
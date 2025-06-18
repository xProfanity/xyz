import { SanityAssetDocument } from "@sanity/client"

export interface SanityObject {
  _id: string
  _type: string
  _createdAt: string | number | Date
  _updatedAt: string | number | Date
}

interface Children {
  marks: string[]
  text: string
  _type: string
}

interface Content {
  asset?: {
    _key: string
    _ref: string
    _type: string
  }
  children?: Children[]
  style?: string
  _key: string
  _type: string
  filename?: string
  fileUrl?: string
}

interface Participation {
  name: string
  content: string
  _key: string
  createdAt: string
  lecture: boolean
}

export type Lecture = Partial<SanityObject> & {
  title: string
  subtext: string
  content: Content[]
  instructorId: string
  educationType: string
  files: LectureFiles[]
  level?: string
  form?: string
  subject?: string
  course?: string
  participations?: Participation[]
}

export type Resource = Partial<SanityObject> & {
  title: string
  document: Partial<SanityAssetDocument> & {
    description: string
    author: string
    notes: string
    cover: {
      coverUrl: string | null
      coverName: string | null
      fileName: string
      fileUrl: string
    }
  }
}

export type Question = Partial<SanityObject> & {
    question: string
    form: string | null
    level: string | null
    course: string | null
    subject: string
    educationType: string
    submissions: string[] | null
}

export type Answer = Partial<Question> & {
    answer: string
    studentId: string
    profileId: string
    question: Question
    grade: number
    comment: string
}

export interface StudentProfile {
  id: number
  user: number
  education_type: string
  is_active: boolean
  date_joined: string
}

export interface TutorProfile {
  id: number
  user: {
    id: number
    name: string
    email: string
  }
  bio: string
  profile_picture: string
  education_types: string[]
  courses: string[]
  qualifications: string
  is_active: boolean
  date_joined: string
}
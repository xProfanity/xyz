import { SanityAssetDocument } from "@sanity/client"

export interface SanityObject {
  _id: string
  _type: string
  _createdAt: string | number | Date
  _updatedAt: string | number | Date
}

export type Resource = Partial<SanityObject> & {
  title: string
  document: Partial<SanityAssetDocument> & {
    description: string
    author: string
    notes: string
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
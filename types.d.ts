export interface Question {
    question: string
    form: string | null
    level: string | null
    course: string | null
    subject: string
    educationType: string
    submissions: string[] | null
    _id: string
}

export type Answer = Partial<Question> & {
    answer: string
    studentId: string
    profileId: string
    question: Question
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
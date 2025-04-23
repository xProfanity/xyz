"use client"

export default function useSchool(education_type: "professional" | "secondary" | undefined) {
    const subjects = [
        {
            subject: "English",
            grade: 1
        },
        {
            subject: "Math",
            grade: 1,
        },
        {
            subject: "Geography",
            grade: 1
        }, 
        {
            subject: "Chemistry",
            grade: 1
        },
        {
            subject: "Physics",
            grade: 1
        },
        {
            subject: "Biology",
            grade: 1
        }, 
    ]
    const courses = [
        {
            subject: "ACCA",
            grade: 2.0
        }, 
        {
            subject: "ABMA",
            grade: 2.0
        }, 
        {
            subject: "ICAM",
            grade: 2.0
        },
        {
            subject: "CILT",
            grade: 2.0
        },
        {
            subject: "ABE",
            grade: 2.0
        }
    ]

    const getSubjects = () => {
        if(education_type === "professional") return courses
        if(education_type === "secondary") return subjects

        return null
    }

    return {
        getSubjects
    }
}
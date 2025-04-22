"use client"

export default function useSchool(education_type: "professional" | "secondary") {
    const subjects = ["Math", "Geography", "Chemistry", "Physics", "Biology", "English"]
    const courses = ["ACCA", "ABMA", "ICAM", "CILT", "ABE"]

    const getSubjects = () => {
        if(education_type === "professional") return courses
        if(education_type === "secondary") return subjects

        return null
    }

    return {
        getSubjects
    }
}
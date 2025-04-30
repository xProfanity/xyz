"use client"

export default function useSchool() {
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

    const forms = ['form 1', 'form 2', 'form 3', 'form 4']

    const levels = [
        {
            title: 'Applied Knowledge Level (ACCA)',
            value: 'Applied Knowledge Level',
            description: "ACCA Applied Knowledge Level"
        },
        {
            title: 'Applied Skills Level (ACCA)',
            value: 'Applied Skills Level',
            description: 'ACCA Applied Skills Level'
        },
        {
            title: 'Strategic Professional Level (ACCA)',
            value: 'Strategic Professional Level',
            descrition: 'ACCA Strategic Professional Level'
        },
        {
            title: 'Level 2: Certificate (CILT)',
            value: 'Level 2: Certificate',
            description: 'CILT Level 2: Certificate'
        },
        {
            title: 'Level 3: Diploma (CILT)',
            value: 'Level 3: Diploma',
            description: 'CILT Level 3: Diploma'
        },
        {
            title: 'Level 3: Diploma (ABMA)',
            value: 'Level 3: Diploma (ABMA)',
            description: 'ABMA Level 3: Diploma',
        },
        {
            title: 'Level 4: Diploma (ABMA)',
            value: 'Level 4: Diploma',
            description: 'ABMA Level 4: Diploma',
        },
        {
            title: 'Knowledge Level (ICAM)',
            value: 'Knowledge Level',
            description: 'ICAM Knowledge Level',
        },
        {
            title: 'Skills Level (ICAM)',
            value: 'Skills Level',
            description: 'ICAM Skills Level',
        },
        {
            title: 'Professional Level (ICAM)',
            value: 'Professional Level',
            description: 'ICAM Professional Level',
        },
        {
            title: 'Advisory Level (ICAM)',
            value: 'Advisory Level',
            description: 'ICAM Advisory Level',
        },
        {
            title: 'Level 3: Foundation Diploma (ABE)',
            value: 'Level 3: Foundation Diploma',
            description: 'ABE Level 3: Foundation Diploma',
        },
        {
            title: 'Level 4: Higher Diploma (ABE)',
            value: 'Level 4: Higher Diploma',
            description: 'ABE Level 4: Higher Diploma',
        },
        {
            title: 'Level 5: Graduate Diploma (ABE)',
            value: 'Level 5: Graduate Diploma',
            description: 'ABE Level 5: Graduate Diploma',
        },
        {
            title: 'Level 6: Extend Graduate Diploma (ABE)',
            value: 'Level 6: Extend Graduate Diploma',
            description: 'ABE Level 6: Extend Graduate Diploma',
        },
    ]

    const getSubjects = (education_type: "professional" | "secondary" | undefined) => {
        if(education_type === "professional") return courses
        if(education_type === "secondary") return subjects

        return null
    }

    return {
        getSubjects,
        forms,
        levels
    }
}
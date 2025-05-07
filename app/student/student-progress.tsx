"use client"

import useSchool from "@/hooks/useSchool"

interface SubjectsProps {
    educationType: "professional" | "secondary" | undefined
    userId?: string | undefined
    profileId?: string | undefined
}

export const SubjectProgress = ({educationType}: SubjectsProps) => {
    const {getSubjects: subjects} = useSchool()
  
    return (
      <div className="flex flex-row flex-wrap gap-2 mt-4">
        {
          !subjects(educationType) ? (
            <p>Loading ...</p>
          ) : (
            subjects(educationType)?.map(({subject, grade}, index) => (
              <div key={index} className="rounded-full px-6 py-2 flex flex-col justify-center items-center bg-[#EFB9EE]">
                <p className="font-black">{subject}</p>
                <p className="font-mono text-white text-xl">{grade.toFixed(1)}</p>
              </div>
            ))
          )
        }
      </div>
    )
  }
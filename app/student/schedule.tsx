import { Button } from "@/components"
import { WeekDates } from "./week-dates"
import { SubjectProgress } from "./student-progress"

export const Schedules = ({studentType}: {studentType: "secondary" | "professional" | undefined}) => {
    return (
      <div className="">
        <WeekDates />
        <SubjectProgress educationType={studentType} />
        <div className="mt-8">
          <h1 className="poppins-bold text-2xl">My schedules</h1>
          <div className="mt-4">
            <p className="text-gray-400 text-lg">your planned schedules and ongoing activities will appear will appear here.</p>
          </div>
  
          <div className="mt-4">
            <Button handleOnClick={() => {}} primary classes={"rounded-lg"}>
              Start planning
            </Button>
          </div>
        </div>
      </div>
    )
  }
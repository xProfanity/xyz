import { Button } from "@/components"
import { WeekDates } from "./week-dates"
import { SubjectProgress } from "./student-progress"

export const Schedules = ({studentType}: {studentType: "secondary" | "professional" | undefined}) => {
    return (
      <div className="flex flex-col justify-start  gap-4 h-full">
        <div className="h-12 w-full flex flex-col justify-center items-start">
          <h1 className="poppins-bold text-2xl">My schedules</h1>
        </div>

        <WeekDates />

        <div className="mt-8">
          <Button handleOnClick={() => {}} primary classes={"rounded-lg"}>
            Start planning
          </Button>
        </div>
      </div>
    )
  }
import { HiBookOpen } from "react-icons/hi";
import { Quizzes } from "./quizzes";

export const WorkField = ({studentType, userId, profileId}: {studentType: "secondary" | "professional" | undefined; userId: string | undefined; profileId: string | null | undefined}) => {
    return (
      <div className="grid gap-4">
        <div className="bg-[#F7D5EA] pb-10 rounded-3xl w-full p-4 flex flex-col justify-start items-start gap-4">
          <div className="flex w-full flex-row justify-between items-center poppins-semibold">
            <h1>Progress</h1>
            <h1><span>0</span>%</h1>
          </div>
  
          <div className="bg-[#F0C6DB] w-full relative h-2 rounded-3xl overflow-hidden">
            <div className="bg-[#312829] h-2 w-[0%]"></div>
          </div>
  
          <div className="mt-10 bg-[#F4C5DF] h-64 lg:h-72 w-64 lg:w-72 rounded-full mx-auto hidden sm:flex flex-col justify-center items-center">
            <HiBookOpen color="#D991B7" className="-mt-20 h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]" />
  
            <p className="text-gray-600 -mt-10">Consistency is the key</p>
          </div>
        </div>
  
        <div>
          <Quizzes educationType={studentType} userId={userId} profileId={profileId as string | undefined} />
        </div>
      </div>
    )
  }
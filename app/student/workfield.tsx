import { HiBookOpen } from "react-icons/hi";
import { Quizzes } from "./quizzes";

import {motion} from "framer-motion"
import Link from "next/link";

export const WorkField = ({studentType, userId, profileId}: {studentType: "secondary" | "professional" | undefined; userId: string | undefined; profileId: string | null | undefined}) => {
    return (
      <div className="flex flex-col justify-around items-center gap-4 h-full">
        <div className="h-12 w-full flex flex-col justify-center items-start">
          <h1 className="text-xl font-bold ">Select an activity below.</h1>
        </div>

        <Link href={"/student/lectures"} className="w-full">
          <motion.div
            whileHover={{
              scale: 1.01
            }}
            className="bg-[#F7D5EA] h-44 cursor-pointer rounded-lg w-full flex flex-col justify-start items-start gap-4 p-4 bg-[url('/flower.svg')] relative bg-cover bg-left-bottom bg-no-repeat">
              <span className="poppins-bold text-2xl sm:text-4xl">{studentType === "professional" ? "Lectures" : "Classes"}</span>
              <h1 className="text-gray-600 text-xs sm:text-base">participate in activities with your {studentType === "professional" ? 'lecturers' : 'teachers'}</h1>  
          </motion.div>
        </Link>

        <Link href={"student/books"} className="w-full">
          <motion.div
            whileHover={{
              scale: 1.01
            }}
            className="bg-[#F7D5EA] h-44 cursor-pointer rounded-lg w-full flex flex-col justify-start items-start gap-4 p-4 bg-[url('/flower.svg')] relative bg-cover bg-left-bottom bg-no-repeat">
              <span className="poppins-bold text-2xl sm:text-4xl">Books/Resources</span>
              <h1 className="text-gray-600 text-xs sm:text-base">Acquire books/resources shared by your {studentType === "professional" ? "lecturers" : "teachers"}</h1>  
          </motion.div>
        </Link>

        <Link href={"student/questions"} className="w-full">
          <motion.div
            whileHover={{
              scale: 1.01
            }}
            className="bg-[#F7D5EA] h-44 cursor-pointer rounded-lg w-full flex flex-col justify-start items-start gap-4 p-4 bg-[url('/flower.svg')] relative bg-cover bg-left-bottom bg-no-repeat">
              <span className="poppins-bold text-2xl sm:text-4xl">Questions</span>
              <h1 className="text-gray-600 text-xs sm:text-base">Test yourself with some of the questions from your class activities</h1>  
          </motion.div>
        </Link>
      </div>
    )
  }
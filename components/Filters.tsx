"use client"

import { useTabs, useUser } from "@/store"
import Button from "./Button"
import SearchInput from "./SearchInput"

export default function Filters() {
    const {active, switchTab} = useTabs()
    const {studentType} = useUser()
  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-2 justify-center items-center">
        <SearchInput />
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-1 w-full md:w-auto">
            <Button handleOnClick={()=>switchTab("all")} primary={active === "all"} classes={"w-full md:w-auto"}>
                All
            </Button>
            <Button handleOnClick={()=>switchTab("lectures")} primary={active === "lectures"} classes={"w-full md:w-auto"}>
                {studentType === "professional" ? "Lectures" : "Lessons"}
            </Button>
            <Button handleOnClick={()=>switchTab("quizzes")} primary={active === "quizzes"} classes={"w-full md:w-auto"}>
                Quizzes
            </Button>
            <Button handleOnClick={()=>switchTab("books")} primary={active === "books"} classes={"w-full md:w-auto"}>
                Books
            </Button>
        </div>
    </div>
  )
}

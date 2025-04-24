"use client"

import Button from "./Button"
import SearchInput from "./SearchInput"

export default function Filters() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-2 justify-center items-center">
        <SearchInput />
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-1 w-full md:w-auto">
            <Button handleOnClick={()=>{}} primary classes={"w-full md:w-auto"}>
                All
            </Button>
            <Button handleOnClick={()=>{}} classes={"w-full md:w-auto"}>
                Lessons
            </Button>
            <Button handleOnClick={()=>{}} classes={"w-full md:w-auto"}>
                Score
            </Button>
        </div>
    </div>
  )
}

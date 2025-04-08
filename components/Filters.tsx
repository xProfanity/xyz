"use client"

import Button from "./Button"
import SearchInput from "./SearchInput"

export default function Filters() {
  return (
    <div className="hidden md:flex flex-col md:flex-row gap-2 justify-center items-center">
        <SearchInput />
        <div className="flex flex-row justify-center items-center gap-1">
            <Button handleOnClick={()=>{}} primary>
                All
            </Button>
            <Button handleOnClick={()=>{}}>
                Lessons
            </Button>
            <Button handleOnClick={()=>{}}>
                Score
            </Button>
        </div>
    </div>
  )
}

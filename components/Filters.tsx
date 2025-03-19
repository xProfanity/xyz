"use client"

import { BiSearch } from "react-icons/bi"
import Button from "./Button"
import Input from "./Input"

export default function Filters() {
  return (
    <div className="hidden md:flex flex-col md:flex-row gap-2 justify-center items-center">
        <div className="w-full md:w-[35rem]">
            <Input
                onChangeFn={()=>{}}
                value=""
                type="text"
                icon={<BiSearch size={35} />}
                placeholder="⌘ + k"
            />
        </div>
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

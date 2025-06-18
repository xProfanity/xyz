"use client"

import { useStudentSideBar, useTabs, useUser } from "@/store"
import Button from "./Button"
import SearchInput from "./SearchInput"

export default function Filters() {
    const {active, switchTab} = useTabs()
    const {studentType} = useUser()
    const {closeSidebar} = useStudentSideBar()

  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-2 justify-center items-center">
        <SearchInput />
        
    </div>
  )
}

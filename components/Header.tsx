"use client"

import { useTabs } from "@/store"
import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()

    const {active} = useTabs()

  return (
    <h1 className="poppins-bold md:text-xl lg:text-3xl xl:text-5xl capitalize">
      {active === "all" ? "Dashboard" : active}
    </h1>
  )
}

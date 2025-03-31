"use client"

import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()
  return (
    <h1 className="poppins-bold md:text-5xl capitalize">{pathname.replace('/student', '').replace('student/', '') || 'Dashboard'}</h1>
  )
}

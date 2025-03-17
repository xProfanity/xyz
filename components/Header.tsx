"use client"

import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()
  return (
    <h1 className="poppins-bold text-5xl">{pathname.replace('/', '') || 'Dashboard'}</h1>
  )
}

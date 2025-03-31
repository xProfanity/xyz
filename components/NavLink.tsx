"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

interface Props {
    index: number
    link: string
    icon: React.ReactNode
    name: string
}

export default function NavLink({index, link, icon, name}: Props) {
    const pathname = usePathname()

    const isActive = (currentLink: string) => pathname === currentLink

  return (
    <Link href={link} className="flex flex-col md:flex-row justify-center items-center gap-2">
        <span className={isActive(link) ? "!text-primary" : ""}>{icon}</span>
        <h1 className="capitalize poppins-light md:poppins-bold hidden md:block text-base text-gray-500">{name.replace('student/', '')}</h1>
    </Link>
  )
}

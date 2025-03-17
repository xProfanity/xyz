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
    <li key={index} className="">
        <Link href={link} className="flex flex-row justify-center items-center gap-2">
            <span className={isActive(link) ? "!text-pink-500" : ""}>{icon}</span>
            <h1 className="capitalize poppins-medium">{name}</h1>
        </Link>
    </li>
  )
}

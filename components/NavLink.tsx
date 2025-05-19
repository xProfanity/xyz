"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

interface Props {
    index: number
    link: string
    icon: React.ReactNode
    name: string
    sidebar?: true | boolean
}

export default function NavLink({index, link, icon, name, sidebar}: Props) {
    const pathname = usePathname()
    const isActive = (currentLink: string) => pathname === currentLink

  return (
    <Link href={link} className={`w-full flex flex-row ${sidebar ? 'justify-between' : 'justify-center'} items-center gap-2`}>
        <h1 className={`capitalize poppins-light md:poppins-bold text-base ${!sidebar && 'hidden'}`}>{name.replace('student/', '')}</h1>
        <span className={isActive(link) && !sidebar ? "!text-primary" : ""}>{icon}</span>
    </Link>
  )
}

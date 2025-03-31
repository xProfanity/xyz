"use client"

import { usePathname } from "next/navigation"

interface Props {
    title: string
    caption: string
}

export default function Stage({title, caption}: Props) {
    const pathname = usePathname()

    const setCursor = (title: string) => pathname.replace("/onboarding/", "").replaceAll('-', ' ') === title.toLowerCase()
  return (
    <li className={`p-5 w-full rounded-lg ${setCursor(title) && 'border border-primary'}`}>
        <h1 className='poppins-semibold text-xl'>{title}</h1>
        <p className='poppins-light text-base text-gray-500'>{caption}</p>
    </li>
  )
}

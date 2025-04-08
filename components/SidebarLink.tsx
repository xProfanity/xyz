"use client"

import { usePathname } from 'next/navigation';
import React from 'react';

export default function SidebarLink({children, link}: {children: React.ReactNode; link: string}) {
    const pathname = usePathname()
    const isActive = (currentLink: string) => pathname === currentLink
  return (
    <li
      className={`flex flex-row justify-between items-center h-10 rounded-full px-5 ${isActive(link) ? 'bg-primary !text-white' : 'text-gray-600 poppins-black'}`}>
        {children}
    </li>
  )
}

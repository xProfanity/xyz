"use client"

import { useInstructorSidebar } from '@/store'
import Image from 'next/image'
import React from 'react'
import { BiX } from 'react-icons/bi'
import { CgMenuLeftAlt } from 'react-icons/cg'

export default function InstructorHeader() {
    const {closeSidebar, isOpen, openSidebar} = useInstructorSidebar()
  return (
    <div className='w-full flex md:hidden flex-row justify-between items-center'>
        <Image
            src={"/logo.png"}
            height={80}
            width={80}
            alt='logo'
            className='object-cover'
        />
        <button className='outline-0' onClick={isOpen ? closeSidebar : openSidebar}>
            {
                isOpen ? ( <BiX size={40} /> ) : ( <CgMenuLeftAlt size={40} /> )
            }
        </button>
    </div>
  )
}

"use client"

import { useSideBar } from '@/store'
import React, { useEffect } from 'react'
import {motion} from "framer-motion" 
import Image from 'next/image'
import { BiX } from 'react-icons/bi'
import Header from './Header'
import Filters from './Filters'
import StudentName from './StudentName'

export default function Sidebar() {
  const {isOpen, closeSidebar} = useSideBar()

  return (
    <motion.section
      className={`fixed h-screen w-full px-4 flex flex-col justify-between items-center md:hidden top-0 z-50 left-full bg-[#FCF9FE]`}
      animate={{
        x: isOpen ? '-100%' : '0'
      }}
      transition={{
        stiffness: '1'
      }}
    >
      <div className='w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center w-full mt-4'>
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="object-cover"
          />
          <button type="button" onClick={closeSidebar}>
            <BiX size={35} />
          </button>
        </div>
        <div className='mt-4 w-full flex flex-col justify-center items-center'>
          <Header />
        </div>
        <div className='mt-4 w-full'>
          <Filters />
        </div>
      </div>

      <div className='mt-4 w-full pb-20'>
        <StudentName />
      </div>


    </motion.section>
  )
}

"use client"

import { useStudentSideBar } from '@/store'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function HamburgerMenu() {
    const {openSidebar} = useStudentSideBar()
  return (
    <button className="" onClick={openSidebar}>
        <GiHamburgerMenu size={35} />
    </button>
  )
}

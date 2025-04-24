"use client"

import { useSideBar } from '@/store'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function HamburgerMenu() {
    const {openSidebar} = useSideBar()
  return (
    <button className="" onClick={openSidebar}>
        <GiHamburgerMenu size={35} />
    </button>
  )
}

"use client"

import { useInstructorSidebar } from "@/store"
import {motion} from "framer-motion"
import Image from "next/image"
import UserProfileFooter from "./UserProfileFooter"
import SidebarLink from "./SidebarLink"
import NavLink from "./NavLink"

interface NavLink {
    name: string
    link: string
    icon: React.ReactNode
}

interface Props {
    navlink: NavLink[]
}

export default function InstructorSidebar({navlink}: Props) {
    const {closeSidebar, isOpen, openSidebar} = useInstructorSidebar()
  return (
    <motion.section
      className={`fixed h-screen w-[80%] px-4 flex flex-col justify-between items-center md:hidden top-0 z-50 right-full bg-[#FCF9FE]`}
      animate={{
        x: isOpen ? '100%' : '0'
      }}
      transition={{
        stiffness: 1
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
        </div>
        <ul className='mt-6 w-full flex flex-col gap-4 justify-center items-center'>
            {navlink.map((link, index) => (
                <SidebarLink key={index} link={link.link}>
                    <NavLink icon={link.icon} index={index} link={link.link} name={link.name} />
                </SidebarLink>
            ))}
        </ul>
      </div>

      <div className='mt-4 w-full pb-20'>
        <UserProfileFooter />
      </div>
    </motion.section>
  )
}

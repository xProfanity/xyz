import { NavLink, SearchInput, SidebarLink, UserProfileFooter } from '@/components'
import Image from 'next/image'
import React from 'react'
import { BiHome, BiReply } from 'react-icons/bi'
import { CgMenuLeft, CgMenuLeftAlt, CgMenuRight } from 'react-icons/cg'
import { MdManageAccounts, MdOutlineCreate, MdOutlineSubject, MdQuestionAnswer } from 'react-icons/md'
import { RiProgress7Line } from 'react-icons/ri'
import { SlSettings } from 'react-icons/sl'
import { TbCategory } from 'react-icons/tb'
import InstructorHeader from './InstructorHeader'
import InstructorSidebar from '@/components/InstructorSidebar'
import { PiNotePencil } from 'react-icons/pi'
import { FcAnswers } from 'react-icons/fc'
import { SiAnswer } from 'react-icons/si'
import { DiResponsive } from 'react-icons/di'
import { VscReply } from 'react-icons/vsc'
import { IoCreate, IoCreateOutline } from 'react-icons/io5'

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const notifications = null
  const navLinks = [
    {
      name: 'home',
      link: '/instructor',
      icon: <BiHome size={25} />,
    },
    {
      name: 'create question',
      link: '/instructor/create',
      icon: <MdOutlineCreate size={25} />
    },
    {
      name: 'manage questions',
      link: '/instructor/questions',
      icon: <PiNotePencil size={25} />,
    },
    {
      name: 'answers submitted',
      link: '/instructor/answers',
      icon: <VscReply size={25} />,
    },
  ]
  return (
      <div className='relative flex flex-row justify-start items-start'>
        <InstructorSidebar navlink={navLinks} />
        <section className='h-screen fixed top-0 left-0 w-[20%] hidden md:flex flex-col bg-gray-200'>
          <div className='h-full w-full p-2 flex flex-col'>
            <div className='h-20 inline-flex justify-start items-center'>
              <Image
                src={"/logo.png"}
                width={100}
                height={100}
                alt='logo'
                className='object-cover'
              />
              <h1 className='mt-5 poppins-bold text-xl text-orange-400 uppercase'>Excellence</h1>
            </div>

            <div className="w-11/12 mx-auto flex-1 flex flex-col justify-between">
              <div className='w-full mt-8'>
                <ul className='w-full flex flex-col gap-2'>
                  {navLinks.map((link, index) => (
                    <SidebarLink key={index} link={link.link}>
                        <NavLink icon={link.icon} index={index} link={link.link} name={link.name} />
                        {notifications && (
                          <span
                            className='h-10 w-10 rounded-full bg-orange-400 flex flex-col justify-center items-center text-white'>
                              {notifications}
                            </span>
                        )}
                    </SidebarLink>
                  ))}
                </ul>
              </div>
              <div className='w-full'>
                <UserProfileFooter />
              </div>
            </div>
          </div>
        </section>
        <section className='min-h-screen w-full md:w-4/5 flex flex-col p-2 md:absolute md:left-1/5'>
          <InstructorHeader />

          <main className=''>
              {children}
          </main>
        </section>
      </div>
  )
}

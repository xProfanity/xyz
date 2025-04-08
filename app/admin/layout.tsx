import { NavLink, SearchInput, SidebarLink, UserProfileFooter } from '@/components'
import Image from 'next/image'
import React from 'react'
import { BiHome } from 'react-icons/bi'
import { MdManageAccounts, MdOutlineSubject } from 'react-icons/md'
import { RiProgress7Line } from 'react-icons/ri'
import { SlSettings } from 'react-icons/sl'
import { TbCategory } from 'react-icons/tb'

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const notifications = null
  const navLinks = [
    {
      name: 'home',
      link: '/admin',
      icon: <BiHome size={25} />,
    },
    {
      name: 'communication & support',
      link: '/admin/communication',
      icon: <TbCategory size={25} />,
    },
    {
      name: 'reports & analytics',
      link: '/admin/reports',
      icon: <TbCategory size={25} />,
    },
    {
      name: 'users',
      link: '/admin/users',
      icon: <MdManageAccounts size={25} />,
    },
    {
      name: 'courses',
      link: '/admin/courses',
      icon: <MdOutlineSubject size={25} />,
    },
    {
      name: 'content',
      link: '/admin/content',
      icon: <RiProgress7Line size={25} />,
    },
    {
      name: 'subscriptions',
      link: '/admin/subscriptions',
      icon: <SlSettings size={25} />,
    },
  ]
  return (
      <div className='relative flex flex-row justify-start items-start divide-x divide-gray-300'>
        <section className='h-screen w-[20%] flex flex-col'>
          <div className='h-full w-full p-2 flex flex-col divide-gray-200 divide-y'>
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
        <section className='min-h-screen w-[80%] flex flex-col p-2'>
          <section className='h-20 w-full p-2 flex flex-row-reverse justify-between items-center'>
              <SearchInput classes='h-2' />
          </section>
          <main className=''>
              {children}
          </main>
        </section>
      </div>
  )
}

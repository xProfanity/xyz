import { NavLink } from '@/components'
import Image from 'next/image'
import React from 'react'
import { BiHome } from 'react-icons/bi'
import { MdOutlineSubject } from 'react-icons/md'
import { RiProgress7Line } from 'react-icons/ri'
import { SlSettings } from 'react-icons/sl'
import { TbCategory } from 'react-icons/tb'

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const navLinks = [
    {
      name: 'home',
      link: '/admin',
      icon: <BiHome size={35} />,
    },
    {
      name: 'users',
      link: '/users',
      icon: <MdOutlineSubject size={35} />,
    },
    {
      name: 'courses',
      link: '/courses',
      icon: <MdOutlineSubject size={35} />,
    },
    {
      name: 'content',
      link: '/content',
      icon: <RiProgress7Line size={35} />,
    },
    {
      name: 'subscriptions',
      link: '/subscriptions',
      icon: <SlSettings size={35} />,
    },
    {
      name: 'reports&analytics',
      link: '/reports&analytics',
      icon: <TbCategory size={35} />,
    },
    {
      name: 'communication&support',
      link: '/communication&support',
      icon: <TbCategory size={35} />,
    },
  ]
  return (
    <html lang='en'>
      <body>
        <div className='relative flex flex-row justify-start items-start'>
          <section className='h-screen w-[20%] flex flex-col justify-between items-center'>
            <div className='w-full p-2'>
              <Image
                src={"/logo.png"}
                width={120}
                height={120}
                alt='logo'
                className='object-cover'
              />

              <div className='w-full mt-8'>
                <ul className='w-11/12 mx-auto flex flex-col gap-4'>
                  {navLinks.map((link, index) => (
                    <li key={index} className='flex flex-row justify-between items-center'>
                      <NavLink icon={link.icon} index={index} link={link.link} name={link.name} />
                      <span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>footer</div>
          </section>
          <main className='min-h-screen w-[80%] bg-[whitesmoke]'>
              {children}
          </main>
        </div>
      </body>
    </html>
  )
}

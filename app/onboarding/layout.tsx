import { Stage } from '@/components'
import Image from 'next/image'
import React from 'react'

export default function OnboardingLayout({children}: {children: React.ReactNode}) {
    const stages = [
        {
            title: 'Username',
            caption: 'Let us know your name',
        },
        {
            title: 'Level of education',
            caption: 'What level of education are you in?'
        },
        {
            title: 'Subjects',
            caption: 'Check the subjects/courses you need and continue'
        }
    ]
  return (
    <div className='h-screen w-full flex flex-row justify-start items-start'>
        <section className='h-full w-1/3 bg-gray-300 hidden md:flex flex-col'>
            <div className='w-3/5 mx-auto mt-12'>
                <Image
                    src={"/logo.png"}
                    height={120}
                    width={120}
                    alt='logo'
                    className='object-cover'
                />
            </div>
            <div className='mt-12 w-3/5 mx-auto'>
                <ul className='w-full flex flex-col justify-start items-start gap-10'>
                    {stages.map((stage, index) => (
                        <Stage caption={stage.caption} title={stage.title} key={index} />
                    ))}
                </ul>
            </div>
        </section>
        <main className='h-full w-full md:w-2/3'>{children}</main>
    </div>
  )
}

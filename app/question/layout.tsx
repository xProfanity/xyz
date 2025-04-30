import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Profile from './Profile'
import GoBackArrow from './GoBackArrow'

export default function QuestionLayout({children}: {children: Readonly<React.ReactNode>}) {
  return (
    <main className='p-4'>
        <div className='w-full flex flex-row justify-between items-center'>
            <div>
                <GoBackArrow />
            </div>

            <div>
                <Profile />
            </div>
        </div>

        <div className='max-w-5xl mx-auto mt-10'>
            {children}
        </div>
    </main>
  )
}

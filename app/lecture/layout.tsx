import React from 'react'
import GoBackArrow from '../question/GoBackArrow'
import Profile from '../question/Profile'

export default function LectureLayout({children}: {children: React.ReactNode}) {
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

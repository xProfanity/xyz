import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen flex flex-col justify-center items-center w-full max-w-xl mx-auto'>
      <div>
        <Image
          src={"/logo.png"}
          height={250}
          width={320}
          alt='logo'
          className='object-cover'
        />
      </div>

      <p className='mt-4 text-gray-400'>Loading...</p>
    </div>
  )
}

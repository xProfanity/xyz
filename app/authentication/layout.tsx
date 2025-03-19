import Image from 'next/image'
import React from 'react'

export default function AuthLayout({children}:{children: React.ReactNode}) {
  return (
    <div className='h-screen w-full bg-[url("/bbblurry.svg")] bg-center bg-cover bg-no-repeat'>
        <div className='h-full flex flex-row justify-center items-center'>
            <main className='h-full w-full md:w-1/2'>{children}</main>
            <div className='h-full w-1/2 hidden md:flex flex-col justify-center items-center'>
                <div className='relative'>
                    <Image
                        src={"/exellmwemb.png"}
                        height={800}
                        width={800}
                        alt='excellencemw'
                        className='object-cover'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

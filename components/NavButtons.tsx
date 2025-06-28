"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack, BiArrowToRight, BiHome } from 'react-icons/bi'
import { BsBack } from 'react-icons/bs'

export default function NavButtons() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='flex flex-row gap-4 justify-center items-center w-fit'>
      {pathname !== "/student" && (
        <>
        <BiArrowBack size={35} color='gray' onClick={() => router.back()} />
        <BreadCrumbs />
        </>
      )}
    </div>
  )
}

interface BreadCrumbs {
  path: string
  name: string
}

const BreadCrumbs = () => {
  const pathname = usePathname()
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumbs[]>()

  console.log('pathname', pathname)
  console.log('breadCrumbs', breadCrumbs)


  useEffect(() => {
    let pathConstruction = ''
    const breads = pathname.replace('/', '').split('/').map((path) => {
      pathConstruction = `${pathConstruction}/${path}`
      
      return {
        path: `${pathConstruction}`,
        name: path.replace('student', 'home')
      }
    })

    setBreadCrumbs(breads)
  }, [pathname])

  return (
    <div className='flex flex-row gap-2'>
      {breadCrumbs?.map((bread, index) => (
        <div key={index} className='flex flex-row gap-2 justify-center items-center'>
          <Link href={bread.path} className='cursor-pointer hover:underline text-gray-500'>{bread.name}</Link>
          {index !== breadCrumbs.length - 1 && (
            <BiArrowToRight size={15} color='gray' />
          )}
        </div>
      ))}
    </div>
  )
}

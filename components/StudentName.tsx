"use client"

import { useUser } from '@/store'

export default function StudentName() {
    const {name} = useUser((state) => state)
  return (
    <h1 className="poppins-bold text-gray-500">Hello <span className='capitalize'>{name}</span></h1>
  )
}

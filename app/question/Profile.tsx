"use client"

import { useUser } from '@/store'
import React from 'react'

export default function Profile() {
  const {name, email} = useUser()
  return (
    <div className='text-right'>
      <h1 className='poppins-semibold'>{name}</h1>
      <p className='text-gray-400'>{email}</p>
    </div>
  )
}

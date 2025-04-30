"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBackButton() {
    const router = useRouter()
  return (
    <button className='poppins-bold cursor-pointer' onClick={() => router.back()}>
        Go back
    </button>
  )
}

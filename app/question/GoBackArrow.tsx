"use client"

import { Button } from '@/components'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function GoBackArrow() {
  const router = useRouter()
  
    return (
       <BiArrowBack onClick={() => router.back()} size={20} />
  )
}

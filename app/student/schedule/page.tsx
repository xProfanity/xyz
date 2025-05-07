"use client"

import React from 'react'
import { Schedules } from '../schedule'
import { useUser } from '@/store'

export default function SchedulePage() {
    const {studentType} = useUser()
  return (
    <Schedules studentType={studentType} />
  )
}

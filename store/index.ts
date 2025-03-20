"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    userId: number
    name: string
    email: string
    role: string
    profileId: string | null
}

type UserState = Partial<User> & {
    setData: (data: Partial<User>) => void
}
  
export const useUser = create<UserState>()(
    persist(
        (set) => ({
            setData: (data) => set(data)
        }),
        {
            name: 'user',
        }
    )
)
"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    userId: string
    name: string
    email: string
    role: string
    studentType: "professional" | "secondary"
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
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
    form: string | null
    course: string | null
}

type UserState = Partial<User> & {
    setData: (data: Partial<User>) => void
}

interface Sidebar {
    isOpen: boolean
    openSidebar: () => void
    closeSidebar: () => void
}
 
interface Tabs {
    active: "all" | "lectures" | "quizzes" | "books"
    switchTab: (tab: "all" | "lectures" | "quizzes" | "books") => void
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

export const useStudentSideBar = create<Sidebar>()((set) => ({
    isOpen: false,
    openSidebar: () => set(() => ({isOpen: true})),
    closeSidebar() {
        set(() => ({isOpen: false}))
    },
}))

export const useInstructorSidebar = create<Sidebar>((set) => ({
    isOpen: false,
    openSidebar: () => set(() => ({isOpen: true})),
    closeSidebar: () => set(() => ({isOpen: false}))
}))

export const useTabs = create<Tabs>((set) => ({
    active: 'all',
    switchTab: (tab) => set(() => ({active: tab}))
}))
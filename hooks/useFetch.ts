"use client"

import { refreshToken } from "@/app/api"
import { BASEURL } from "@/constants"
import { usePathname } from "next/navigation"

export default function useFetch() {

    const pathname = usePathname()

    const fetchRequest = async (endpoint: string, method: string, body?: string | null) => {

        console.log('pathname', pathname)
        if(!localStorage.getItem('access') && pathname !== '/authentication/sign-in') {
            localStorage.removeItem('refresh')
            localStorage.removeItem('user')
            await fetch('/api/set-cookie', {method: 'DELETE'})

            throw "user not found"
        }

        try {
            const response = await fetch(`${BASEURL}/${endpoint}`, {
                body,
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })

            const data = await response.json()

            if(data.status_code === 401 && pathname !== '/authentication/sign-in') {
                const token = await refreshToken(localStorage.getItem('refresh') as string, localStorage.getItem('access') as string)
                localStorage.setItem('access', token?.access)
                localStorage.setItem('refresh', token?.refresh)

                return await fetchRequest(endpoint, method, body)
            }

            return data
        } catch (error) {
            console.log('error', error)
            throw "Server error"
        }
    }

    return {
        fetchRequest
    }
}
"use client"

import { refreshToken } from "@/app/api";
import { Button, Input } from "@/components";
import { BASEURL } from "@/constants";
import { useUser } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Username() {
    const [username, setUsername] = useState("")
    const router = useRouter()
    const {setData} = useUser((state) => state)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const submitUsername = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${BASEURL}/user/profile/`, {
                method: 'PATCH',
                body: JSON.stringify({
                    name: username,
                    role: 'student'
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })

            const data = await response.json()

            if(data?.status_code === 401) {
                const response = await refreshToken(localStorage.getItem('refresh') as string, localStorage.getItem('access') as string)
                console.log('response', response)
                localStorage.setItem('access', response?.access)
                localStorage.setItem('refresh', response?.refresh)

                return submitUsername()
            }

            setError("")
            setData({ name: username })
            router.push('/onboarding/level-of-education')
        } catch (error) {
            console.log('error', error)
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="h-screen flex flex-col justify-center items-center">

        <div className="block md:hidden">
            <Image
                src={"/logo.png"}
                width={180}
                height={180}
                alt="logo"
                className="object-cover"
            />
        </div>

        <div className="w-5/6 md:w-[35rem] flex flex-col gap-10 mt-12">
            <Input
                onChangeFn={({target})=>setUsername(target.value)}
                value={username}
                classes="bg-gray-300 mx-auto"
                placeholder="What is your name?"
                required
            />

            {error && (
                <span className="text-red-500">{error}</span>
            )}

            <Button handleOnClick={submitUsername} loading={loading} disabled={loading} primary fullWidth>
                {'Continue'}
            </Button>
        </div>
    </div>
  )
}

"use client"

import { Button, Input } from '@/components'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function InstructorOnBoarding() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {fetchRequest} = useFetch()
    const {setData} = useUser()

    const router = useRouter()

    const submitDetails = async () => {
        try {
            setIsLoading(true)
            const response = await fetchRequest(
                "user/profile/",
                "PATCH",
                JSON.stringify({
                    name,
                    password
                })
            )

            setData({
                name,
                profileId: null,
                //@ts-ignore
                studentType: null,
                role: "instructor",

            })

            router.push('/instructor')
        } catch (error) {
            console.log('error', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='h-screen w-full max-w-4xl mx-auto flex flex-col justify-center items-center border border-gray-200'>
        <Image
            src={"/logo.png"}
            height={90}
            width={90}
            alt='logo'
            className='object-cover'
        />
        <h1 className='mt-4 poppins-black text-2xl'>Welcome to excellence</h1>
        <p className='text-gray-500 mt-2'>Please fill in the fields to proceed</p>

        <Input
            onChangeFn={({target}) => setName(target.value)}
            value={name}
            classes='mt-10 mx-auto'
            placeholder='Your name'
            required
        />
        <Input
            onChangeFn={({target}) => setPassword(target.value)}
            value={password}
            classes='mt-4 mx-auto'
            placeholder='Your new password'
            required
        />

        <Button handleOnClick={submitDetails} disabled={isLoading || !name || !password} loading={isLoading} classes={"mt-10"} primary>
            Submit
        </Button>
    </div>
  )
}

"use client"

import { Button, Input } from '@/components'
import useFetch from '@/hooks/useFetch'
import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {fetchRequest} = useFetch()

    const handleRegisterUser = async () => {
        try {
            setIsLoading(true)
            await fetchRequest(
                'user/register/',
                'POST',
                JSON.stringify({
                    email, password,
                    role: 'instructor',
                    name: 'null'
                })
            )
        } catch (error) {
            console.log('error', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <section className='h-screen w-full max-w-3xl mx-auto flex flex-col justify-center items-center'>
        <h1 className='poppins-black text-3xl'>Register an instructor</h1>
        <p className='text-gray-500 text-sm mt-4'>Fill in the details</p>

        <Input
            onChangeFn={({target}) => setEmail(target.value)}
            value={email}
            placeholder='instructor email'
            required
            type='email'
            classes='mx-auto mt-4'
        />

        <Input
            onChangeFn={({target}) => setPassword(target.value)}
            value={password}
            placeholder='sign up password'
            required
            type='password'
            classes='mx-auto mt-4'
        />

        <Button
            handleOnClick={handleRegisterUser}
            primary
            classes={"mt-4"}
            disabled={isLoading || !email || !password}
            loading={isLoading}
        >
            Register
        </Button>
    </section>
  )
}

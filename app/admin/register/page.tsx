"use client"

import { Button, Input } from '@/components'
import useFetch from '@/hooks/useFetch'
import { p } from 'framer-motion/client'
import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

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

            setError("")
            setSuccess(`Successfully registered ${email} with password ${password}`)
        } catch (error) {
            console.log('error', error)
            setSuccess("")
            setError("Something went wrong")
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
            type='text'
            classes='mx-auto mt-4'
        />

        <div className='mt-4'>
            {error && (
                <p className='text-red-500'>{error}</p>
            )}
            {success && (
                <p className='text-green-500'>{success}</p>
            )}
        </div>

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

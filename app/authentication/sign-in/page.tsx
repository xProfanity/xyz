"use client"

import Link from "next/link";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

import { Button, Input } from "@/components";
import { BASEURL } from "@/constants";
import { useUser } from "@/store";
import { useRouter } from "next/navigation";

export default function Signin() {
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword]= useState(false)

    const [signIn, setSignIn] = useState(true)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const {setData} = useUser((state) => state)

    const toggleAuthMode = () => setSignIn(!signIn)

    const handleSignIn = async () => {
        try {

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    email: emailAddress,
                    password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            setIsLoading(true)
            const response = await fetch(`${BASEURL}/user/login/`, options)
            const data = await response.json()

            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)

            setData({
                name: data.username,
                email: emailAddress,
                role: data.role,
                userId: data.user_id
            })

            router.push('/')
        } catch (error) {
            console.log('error signing in', error)
            setError(error as string)
        } finally {
            setIsLoading(false)
        }
    }
    const handleSignUp = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${BASEURL}/user/register/`, {
                method: 'POST',
                body: JSON.stringify({
                    name: '',
                    email: emailAddress,
                    password,
                    role: 'student',
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response2 = await fetch(`${BASEURL}/token`, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailAddress,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            const token = await response2.json()

            localStorage.setItem('refresh', token.refresh)
            localStorage.setItem('access', token.access)

            setData({
                email: emailAddress,
                role: data.role,
                name: data.name
            })


        } catch (error) {
            console.log('error', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
        <section className="w-5/6 md:w-2/3">
            <div className="w-full">
                <h1 className="poppins-bold text-6xl uppercase">
                    {signIn ? 'Sign in' : 'Sign up'}
                </h1>
                <h1 className="poppins-semibold text-4xl capitalize mt-4">Enter your account details</h1>
            </div>

            <div className="w-full mt-10">
                <Input
                    onChangeFn={({target})=>setEmailAddress(target.value)}
                    value={emailAddress}
                    classes="bg-gray-400"
                    icon={<MdEmail size={35} />}
                    placeholder="Email address"
                    required
                    type="email"
                />
            </div>
            <div className="w-full mt-4">
                <Input
                    onChangeFn={({target})=>setPassword(target.value)}
                    value={password}
                    classes="bg-gray-400 rounded-lg"
                    icon={<TbPasswordUser size={35} />}
                    placeholder="Password"
                    required
                    type={`${showPassword ? "text" : "password"}`}
                />
            </div>

            {
                !signIn && (
                    <div className="w-full mt-4">
                        <Input
                            onChangeFn={({target})=>setConfirmPassword(target.value)}
                            value={confirmPassword}
                            classes="bg-gray-400 rounded-lg"
                            icon={<TbPasswordUser size={35} />}
                            placeholder="Confirm Password"
                            required
                            type={`${showPassword ? "text" : "password"}`}
                        />
                    </div>
                )
            }

            <div className="min-h-10 flex flex-col justify-center items-start">
                <span className="text-red-500">{error}</span>
            </div>
            
            <div className="flex flex-row gap-2 justify-start items-start">
                <input
                    type="checkbox"
                    name="visibility"
                    id="visibility"
                    className="w-5 h-5"
                    checked={showPassword}
                    onChange={()=>setShowPassword(!showPassword)}
                />
                <label htmlFor="visibility">Show Password</label>
            </div>

            <Button handleOnClick={signIn ? handleSignIn : handleSignUp} primary fullWidth classes={"mt-10"} loading={isLoading}>
                {signIn ? 'Sign in' : 'Sign up'}
            </Button>

            <div className="w-full flex flex-row justify-between items-center mt-5">
                <Button handleOnClick={toggleAuthMode} textBtn classes={"underline"}>
                    {signIn ? 'Create account' : 'Already have an account'}
                </Button>

                {
                    signIn && (
                        <Link href={"/"} className="underline text-base">
                            Forgot Password
                        </Link>
                    )
                }
            </div>
        </section>
    </div>
  )
}

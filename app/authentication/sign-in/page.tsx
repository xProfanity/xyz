"use client"

import Link from "next/link";
import { ReactElement, useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

import { Button, Input } from "@/components";
import { BASEURL } from "@/constants";
import useFetch from "@/hooks/useFetch";
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
    const {fetchRequest} = useFetch()

    const toggleAuthMode = () => setSignIn(!signIn)

    const formSection = useRef<ReactElement>(null)

    const handleSignIn = async () => {
        try {
            setIsLoading(true)
            
            const data = await fetchRequest('user/login/', 'POST', JSON.stringify({
                email: emailAddress,
                password
            }))

            if(data.status_code === 401) {
                setPassword("")
                // setError("Credentials don't match any records")
                
                throw "Credentials don't match any records"
            }

            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)

            try {
                if(!JSON.parse(data?.username)) {
                    setData({
                        email: emailAddress
                    })
                    return router.push("/on-boarding-instructor")
                }
            } catch (error) {
                                
            }

            if(data?.role?.toLowerCase() === 'student') {
                
                const res = await fetchRequest('student-profiles', 'GET')

                const profileId = res?.[0].id
                const studentType = res?.[0].education_type

                setData({
                    profileId,
                    studentType
                })
            }

            await fetch('/api/set-cookie', {
                method: 'POST',
                body: JSON.stringify({
                    access: data.access,
                    role: data.role.toLowerCase()
                })
            })

            const enrollments = await fetchRequest("enrollments/", "GET")

            const studentEnrollments = enrollments.filter((enrollment: {student: number}, index: number) => enrollment.student === data.user_id)[0]

            setData({
                name: data.username,
                email: emailAddress,
                role: data.role,
                userId: data.user_id,
                course: studentEnrollments.course,
                form: studentEnrollments.current_level
            })
            setError("")
            router.push(data?.role?.toLowerCase() === 'student' ? '/student' : data?.role?.toLowerCase() === "admin" ? '/admin' : '/instructor')
        } catch (rejection) {
            console.log('error signing in', rejection)
            setPassword("")
            setError("error signing in")
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
                    name: 'new student',
                    email: emailAddress,
                    password,
                    role: 'student',
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response2 = await fetch(`${BASEURL}/token/`, {
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

            if(!token?.access) {
                return setError("Error creating user")
            }

            if(data.status_code === 400) {
                throw "User with this email already exists"
            }

            localStorage.setItem('refresh', token.refresh)
            localStorage.setItem('access', token.access)

            setData({
                email: emailAddress,
                role: data.role,
                name: data.name
            })

            setError("")
            router.push("/onboarding/username")
        } catch (error) {
            console.log('error', error)
            setConfirmPassword("")
            setPassword("")
            setError("error signing in")
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
        <section className="w-5/6 md:w-2/3 max-w-[590px]">
            <div className="w-full">
                <h1 className="poppins-bold text-4xl uppercase">
                    {signIn ? 'Sign in' : 'Sign up'}
                </h1>
                <h1 className="poppins-semibold text-xl text-gray-500 lowercase">Enter your account details</h1>
            </div>

            <div className="w-full mt-4">
                <Input
                    onChangeFn={({target})=>setEmailAddress(target.value)}
                    value={emailAddress}
                    classes="bg-gray-400"
                    icon={<MdEmail size={20} />}
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
                    icon={<TbPasswordUser size={20} />}
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
                            icon={<TbPasswordUser size={20} />}
                            placeholder="Confirm Password"
                            required
                            type={`${showPassword ? "text" : "password"}`}
                        />
                    </div>
                )
            }

            <div className="min-h-10 flex flex-col justify-center items-start">
                <span className="text-red-500 text-sm">{error}</span>
            </div>
            
            <div className="flex flex-row gap-2 justify-start items-center">
                <input
                    type="checkbox"
                    name="visibility"
                    id="visibility"
                    className="w-4 h-4"
                    checked={showPassword}
                    onChange={()=>setShowPassword(!showPassword)}
                />
                <label htmlFor="visibility" className="text-sm">Show Password</label>
            </div>

            <Button handleOnClick={() => {
                if(password && emailAddress) {
                    setError("")

                    if(signIn) {
                        return handleSignIn()
                    } return handleSignUp()
                }

                return setError("Email and password required!")
            }} primary fullWidth classes={"mt-10"} loading={isLoading}>
                {signIn ? 'Sign in' : 'Sign up'}
            </Button>

            <div className="w-full flex flex-row justify-between items-center mt-10">
                <Button handleOnClick={toggleAuthMode} textBtn classes={"underline"}>
                    {signIn ? 'Create account' : 'Already have an account'}
                </Button>

                {
                    signIn && (
                        <Link href={"/"} className="underline text-sm ">
                            Forgot Password
                        </Link>
                    )
                }
            </div>
        </section>
    </div>
  )
}

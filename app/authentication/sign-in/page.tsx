"use client"

import Link from "next/link";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

import { Button, Input } from "@/components";

export default function Signin() {
    const [signIn, setSignIn] = useState(true)

    const toggleAuthMode = () => setSignIn(!signIn)

    const handleSignIn = () => {}
    const handleSignUp = () => {}

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
        <form action="" className="w-2/3">
            <div className="w-full">
                <h1 className="poppins-bold text-6xl uppercase">
                    {signIn ? 'Sign in' : 'Sign up'}
                </h1>
                <h1 className="poppins-semibold text-4xl capitalize mt-4">Enter your account details</h1>
            </div>

            <div className="w-full mt-10">
                <Input
                    onChangeFn={()=>{}}
                    value=""
                    classes="bg-gray-400"
                    icon={<MdEmail size={35} />}
                    placeholder="Email address"
                    required
                    type="email"
                />
            </div>
            <div className="w-full mt-4">
                <Input
                    onChangeFn={()=>{}}
                    value=""
                    classes="bg-gray-400 rounded-lg"
                    icon={<TbPasswordUser size={35} />}
                    placeholder="Password"
                    required
                    type="password"
                />
            </div>

            {
                !signIn && (
                    <div className="w-full mt-4">
                        <Input
                            onChangeFn={()=>{}}
                            value=""
                            classes="bg-gray-400 rounded-lg"
                            icon={<TbPasswordUser size={35} />}
                            placeholder="Confirm Password"
                            required
                            type="password"
                        />
                    </div>
                )
            }

            <Button handleOnClick={signIn ? handleSignIn : handleSignUp} primary fullWidth classes={"mt-10"}>
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
        </form>
    </div>
  )
}

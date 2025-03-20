"use client"

import { Button, Input } from "@/components";
import { useState } from "react";

export default function Username() {
    const [username, setUsername] = useState("")
  return (
    <div className="h-full flex flex-col justify-center items-center">
        <div className="w-[35rem] flex flex-col gap-10">
            <Input
                onChangeFn={()=>{}}
                value=""
                classes="bg-gray-300 mx-auto"
                placeholder="What is your name?"
                required
            />

            <Button handleOnClick={()=>{}} primary fullWidth>
                Continue
            </Button>
        </div>
    </div>
  )
}

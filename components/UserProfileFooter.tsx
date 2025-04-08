"use client"

import { useUser } from "@/store"
import { useRouter } from "next/navigation"
import { BiLogOut } from "react-icons/bi"

export default function UserProfileFooter() {
  const {email, name} = useUser((state) => state)
  const router = useRouter()
  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <h1 className="text-gray-400">{email}</h1>
      <h1 className="poppins-black capitalize">{name}</h1>

      <button
        className="mt-2 cursor-pointer"
        onClick={async () => {
          await fetch('api/set-cookie', {method: 'DELETE'})
  
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          localStorage.removeItem('user')
    
          router.push('/authentication/sign-in')
        }}
      >
        <BiLogOut size={35} />
      </button>
    </div>
  )
}

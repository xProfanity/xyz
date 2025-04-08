"use client"

import { useUser } from '@/store'
import { useRouter } from 'next/navigation'
import { BiLogOut } from 'react-icons/bi'

export default function StudentName() {
    const {name} = useUser((state) => state)

    const router = useRouter()

    const logout = async () => {
      await fetch('api/set-cookie', {method: 'DELETE'})

      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.removeItem('user')

      router.push('/authentication/sign-in')
    }
  return (
    <div className='inline-flex gap-5 justify-center items-center'>
      <h1 className="poppins-bold text-gray-500">Hello <span className='capitalize'>{name}</span></h1>
      <button className='cursor-pointer' onClick={logout}>
        <BiLogOut size={35} />
      </button>
    </div>
  )
}

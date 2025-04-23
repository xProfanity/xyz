'use client'
 
import { useEffect } from 'react'
 
interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({error, reset}: ErrorProps) {
  
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='h-screen w-full max-w-2xl mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-3xl poppins-black'>OOPS!</h1>
      <h2 className='mt-5'>{error.name}</h2>
      <p className='text-gray-400 text-center mt-2'>{error.message}</p>
      <button
        onClick={
          () => reset()
        }
        className='mt-10'
      >
        Try again
      </button>
    </div>
  )
}
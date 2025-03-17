import React from "react"

interface Props {
    children: React.ReactNode
    primary?: true | boolean
    fullWidth?: true | boolean
    classes?: string | null
    disabled?: boolean
    handleOnClick: () => void
}

export default function Button({children, primary, classes, handleOnClick, fullWidth, disabled}: Props) {
  return (
    <button className={`h-16 px-10 rounded-full flex flex-col justify-center items-center cursor-pointer ${primary ? 'bg-black text-white' : 'border border-black'} ${fullWidth && 'w-full'} ${classes}`} onClick={handleOnClick} disabled={disabled}>
        {children}
    </button>
  )
}

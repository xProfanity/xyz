import React from "react"

interface Props {
    children: React.ReactNode
    primary?: true | boolean
    fullWidth?: true | boolean
    textBtn?: true | boolean
    classes?: string | null
    disabled?: boolean
    handleOnClick: () => void
}

export default function Button({children, primary, classes, handleOnClick, fullWidth, disabled, textBtn}: Props) {
  return (
    <button className={`rounded-full flex flex-col justify-center items-center cursor-pointer ${primary ? 'bg-black text-white' : 'border border-black'} ${fullWidth && 'w-full'} ${textBtn ? 'border-0 h-0 px-0' : 'h-16 px-10'} ${classes}`} onClick={handleOnClick} disabled={disabled}>
        {children}
    </button>
  )
}

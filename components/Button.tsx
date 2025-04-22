import React from "react"

interface Props {
    children: React.ReactNode
    primary?: true | boolean
    fullWidth?: true | boolean
    textBtn?: true | boolean
    classes?: string | null
    disabled?: boolean
    loading?: true | boolean
    handleOnClick: () => void
}

export default function Button({children, primary, classes, handleOnClick, fullWidth, disabled, textBtn, loading}: Props) {
  return (
    <button className={`rounded-full flex flex-col justify-center items-center cursor-pointer ${primary ? loading ? 'bg-gray-300 text-black' : 'bg-primary text-white' : 'border border-primary'} ${fullWidth && 'w-full max-w-[614px]'} ${textBtn ? 'border-0 h-0 px-0' : 'h-12 px-10'} ${classes}`} onClick={handleOnClick} disabled={disabled}>
        {loading ? 'Loading...' : children}
    </button>
  )
}

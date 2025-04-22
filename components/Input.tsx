import React, { ChangeEvent } from "react";

type Props = {
    type?: string;
    classes?: string;
    value: string;
    placeholder?: string;
    inputId?: string;
    name?: string;
    autoComplete?: string;
    required?: true | boolean;
    icon?: React.ReactNode;
    onChangeFn: (e: ChangeEvent<HTMLInputElement>) => void;
}



export default function Input({type, classes, onChangeFn, placeholder, value, inputId, name, autoComplete, required, icon}: Props) {
  return (
    <div className="inline-flex w-full">
      {
        icon && (
          <span className={`h-12 w-10 rounded-s-full flex flex-col justify-center items-center bg-gray-300 ${classes}`}>
            {icon}
          </span>
        )
      }
      <input
          type={type || 'text'}
          className={`h-12 outline-none w-full max-w-[550px] bg-gray-300 ${!icon ? 'rounded-full' : 'rounded-e-full'} text-[#181818] dark:font-semibold text-sm placeholder:text-sm p-4 ${classes}`}
          value={value}
          onChange={onChangeFn}
          placeholder={placeholder}
          id={inputId}
          name={name}
          autoComplete={autoComplete}
          required={required}
      />
    </div>
  )
}

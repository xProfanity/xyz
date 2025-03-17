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
          <span className="h-16 w-16 rounded-s-full bg-gray-200 flex flex-col justify-center items-center p-4">
            {icon}
          </span>
        )
      }
      <input
          type={type || 'text'}
          className={`h-16 bg-gray-200 outline-none w-full max-w-[550px] ${!icon ? 'rounded-full' : 'rounded-e-full'} text-[#181818] dark:font-semibold text-lg p-4 ${classes}`}
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

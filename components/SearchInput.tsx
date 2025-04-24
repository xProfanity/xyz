"use client"

import { BiSearch } from 'react-icons/bi'
import Input from './Input'

interface Props {
    classes?: string
}

export default function SearchInput({classes}: Props) {
  return (
    <div className="w-full block">
        <Input
            onChangeFn={()=>{}}
            value=""
            type="text"
            icon={<BiSearch size={20} color={'gray'} />}
            placeholder="⌘ + k"
            classes={classes}
        />
    </div>
  )
}

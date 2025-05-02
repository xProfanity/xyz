import { SanityAssetDocument } from '@sanity/client'
import React from 'react'

interface Props {
    resource: SanityAssetDocument & {title: string}
}

export default function ResourceDetail({resource}: Props) {
  return (
    <div>
        <h1 className='poppins-bold text-lg'>{resource.title}</h1>
    </div>
  )
}

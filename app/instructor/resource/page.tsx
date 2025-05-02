"use client"

import { Button } from '@/components'
import { submitResource } from '@/services/sanity'
import { useUser } from '@/store'
import { client } from '@/utils/sanity'
import { SanityAssetDocument } from '@sanity/client'
import React, { useState } from 'react'
import { CgAttachment } from 'react-icons/cg'
import { toast } from 'sonner'

export default function Resource() {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<SanityAssetDocument | null>(null)
    const [uploadingFile, setUploadingFile] = useState(false)
    const [loading, setLoading] = useState(false)

    const {userId} = useUser()

    const handleFileSelect = () => {
        const input = document.createElement("input")
        input.type = 'file'

        input.addEventListener('change', async () => {
            const file = input.files?.[0]

            if(file) {
                try {
                    setUploadingFile(true)
                    const fileAsset = await client.assets.upload("file", file, {contentType: file.type, filename: file.name, preserveFilename: true})
                    
                    setFile(fileAsset)
                } catch (error) {
                    console.log('error', error)
                } finally {
                    setUploadingFile(false)
                }
            }
        })

        input.click()
    }

    const handleSubmitResource = async () => {
        try {
            setLoading(true)
            await submitResource(title, notes, description, file?._id as string, userId?.toString() as string)
            setTitle("")
            setNotes("")
            setDescription("")
            setFile(null)

            toast.success("Uploaded resource successfully")
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='w-full max-w-3xl mx-auto'>
        <h1 className='poppins-bold text-lg'>Add a Resource here</h1>
        <p className='text-gray-400'>Fill in the fields to add a resource for your students</p>

        <div className='flex flex-col mt-8'>
            <label htmlFor="" className='poppins-semibold'>Title</label>
            <input
                type="text"
                className='border border-black rounded-lg p-2 mt-4'
                placeholder='add a title here'
                value={title}
                onChange={({target}) => setTitle(target.value)}
            />
        </div>

        <div className='flex flex-col mt-8'>
            <label htmlFor="" className='poppins-semibold'>Notes</label>
            <textarea
                className='border border-black rounded-lg p-2 mt-4'
                placeholder='add some notes here'
                value={notes}
                onChange={({target}) => setNotes(target.value)}
                rows={4}
            />
        </div>

        <div className='flex flex-col mt-8'>
            <label htmlFor="" className='poppins-semibold'>Description</label>
            <input
                type="text"
                className='border border-black rounded-lg p-2 mt-4'
                placeholder='add a description here'
                value={description}
                onChange={({target}) => setDescription(target.value)}
            />
        </div>

        <div className='mt-8 inline-flex gap-4'>
            <button onClick={handleFileSelect} className='inline-flex gap-2 text-gray-400 cursor-pointer outline-none'>
                <span>Attachment</span> <CgAttachment className='rotate-45' size={25} />
            </button>
            {file && (
                <>
                <span className='text-gray-400'>:</span>
                <span className='text-gray-400'>{file.originalFilename}</span>
                </>
            )}
            {uploadingFile && (
                <>
                <span className='text-gray-400'>:</span>
                <span className='text-gray-400'>uploading...</span>
                </>
            )}
        </div>

        <Button
            handleOnClick={handleSubmitResource}
            classes={"w-full md:w-fit rounded-lg mt-8"}
            primary
            loading={loading}
            disabled={loading || title === "" || notes === "" || !file}
        >
            Submit
        </Button>
    </div>
  )
}

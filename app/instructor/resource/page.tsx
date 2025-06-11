"use client"

import { Button } from '@/components'
import useSchool from '@/hooks/useSchool'
import { submitResource } from '@/services/sanity'
import { useUser } from '@/store'
import { client } from '@/utils/sanity'
import { SanityAssetDocument } from '@sanity/client'
import React, { useState } from 'react'
import { CgAttachment } from 'react-icons/cg'
import { GiBookCover } from 'react-icons/gi'
import { toast } from 'sonner'

export default function Resource() {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<SanityAssetDocument | null>(null)
    const [thumb, setThumbnail] = useState<SanityAssetDocument | null>(null)
    const [uploadingFile, setUploadingFile] = useState(false)
    const [uploadingThumb, setUploadingThumb] = useState(false)

    const [loading, setLoading] = useState(false)

    const [educationType, setEducationType] = useState("")
    const [subject, setSubject] = useState("")
    const [course, setCourse] = useState("")
    const [form, setForm] = useState("")
    const [level, setLevel] = useState("")

    const {getSubjects, levels, forms} = useSchool()    

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

    const handleThumbSelect = () => {
        const input = document.createElement("input")
        input.type = 'file'

        input.addEventListener('change', async () => {
            const file = input.files?.[0]
            const allowedTypes = ["image/png", "image/jpeg"]

            if(file) {
                if(allowedTypes.includes(file.type)) {
                    try {
                        setUploadingThumb(true)
                        const fileAsset = await client.assets.upload("file", file, {contentType: file.type, filename: file.name, preserveFilename: true})
                        
                        setThumbnail(fileAsset)
                    } catch (error) {
                        console.log('error', error)
                    } finally {
                        setUploadingThumb(false)
                    }
                }
                toast.error("invalid file format for the resource cover")
            }
        })

        input.click()
    }

    const handleSubmitResource = async () => {
        try {
            setLoading(true)
            await submitResource(title, notes, description, file?._id as string, userId?.toString() as string, educationType, subject, course, form, level, thumb?._id)
            setTitle("")
            setNotes("")
            setDescription("")
            setFile(null)
            setEducationType("")
            setSubject("")
            setCourse("")
            setForm("")
            setLevel("")
            setThumbnail(null)

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

        <div className='mt-8 flex flex-col md:inline-flex gap-4'>
            <button onClick={handleFileSelect} className='inline-flex gap-2 text-gray-400 cursor-pointer outline-none'>
                <span>Attachment</span> <CgAttachment className='rotate-45' size={25} />
            </button>
            {uploadingFile ? (
                <div>
                    <span className='text-gray-400'>uploading...</span>
                </div>
            ) : file && (
                <div>
                    <span className='text-gray-400'>{file.originalFilename}</span>
                </div>
            )}
            <button onClick={handleThumbSelect} className='inline-flex gap-2 text-gray-400 cursor-pointer outline-none'>
                <span>Cover</span> <GiBookCover className='rotate-45' size={25} />
            </button>
            {uploadingThumb ? (
                <>
                <span className='text-gray-400'>uploading...</span>
                </>
            ) : thumb && (
                <>
                <span className='text-gray-400'>{thumb.originalFilename}</span>
                </>
            )}
        </div>

        <div className='w-full flex flex-col justify-start items-start gap-4 mt-4'>
            <div className='w-full'>
                <label htmlFor="">Education Type</label>
            </div>
            <select onChange={({target}) => setEducationType(target.value)} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full'>
                <option value=""></option>
                <option value="secondary">Secondary</option>
                <option value="professional">Professional</option>
            </select>
            {educationType === "secondary" && (
                <>
                    <div className='w-full'>
                        <label htmlFor="">Subject</label>
                    </div>
                    <select onChange={({target}) => {
                        setSubject(target.value)
                        setCourse("")
                    }} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full'>
                        <option value=""></option>
                        {getSubjects(educationType)?.map(({subject}, index) => (
                            <option key={index} value={subject.toLowerCase()} className='capitalize'>{subject}</option>
                        ))}
                    </select>
                </>
            )}
            {educationType === "professional" && (
                <>
                <div className='w-full'>
                    <label htmlFor="">Course</label>
                </div>
                <select onChange={({target}) => {
                    setCourse(target.value)
                    setSubject("")
                }} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full'>
                    <option value=""></option>
                    {getSubjects(educationType)?.map(({subject}, index) => (
                        <option key={index} value={subject.toLowerCase()} className='capitalize'>{subject}</option>
                    ))}
                </select>
                </>
            )}
            {educationType === "secondary" && (
                <>
                <div className='w-full'>
                    <label htmlFor="">Form</label>
                </div>
                <select onChange={({target}) => {
                    setForm(target.value)
                    setLevel("")
                }} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full'>
                    <option value=""></option>
                    {forms.map((form, index) => (
                        <option key={index} value={form} className='capitalize'>{form}</option>
                    ))}
                </select>
                </>
            )}
            {educationType === "professional" && (
                <>
                <div className='w-full'>
                    <label htmlFor="">Level</label>
                </div>
                <select onChange={({target}) => {
                    setLevel(target.value)
                    setForm("")
                }} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full'>
                    <option value=""></option>
                    {levels.map(({value, title}, index) => (
                        <option key={index} value={value} className='capitalize'>{title}</option>
                    ))}
                </select>
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

"use client"

import { Button } from '@/components'
import { submitLecture } from '@/services/sanity'
import { useUser } from '@/store'
import { fileType } from '@/utils'
import { client } from '@/utils/sanity'
import { File } from 'buffer'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiAddToQueue, BiPaperPlane, BiPlus, BiUpload } from 'react-icons/bi'
import { CgAttachment } from 'react-icons/cg'
import { FiFileText } from 'react-icons/fi'
import { MdUpdate } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'sonner'

interface BlockText {
  type: string
  content: string | File
  urlObject?: string | null
  filename?: string | null
}

export default function Lecture() {
  const [title, setTitle] = useState("")

  const [textarea, setTextArea] = useState("")
  const [blockText, setBlockText] = useState<BlockText[]>([{ type: 'block', content: '' }])
  const [uploadingFile, setUploadingFile] = useState(false)
  const [updating, setUpdating] = useState<{state: boolean; paragraph: number | null}>({state: false, paragraph: null})
  const [submittingLecture, setSubmittingLecture] = useState(false)

  const [loading, setLoading] = useState(false)

  const {userId} = useUser()

  const addParagraph = () => {
    if(blockText[blockText.length-1]) {
      setBlockText([...blockText, {type: 'block', content: textarea}])
      setTextArea("")
    }
  }
  const updateParagraph = () => {

    setBlockText((state) => {
      const copyBlockText = state

      copyBlockText[updating.paragraph!].content = textarea

      return copyBlockText
    })

    setTextArea("")
    setUpdating({state: false, paragraph: null})
  }

  const handleEditParagraph = (content: string, index:number) => {
    setTextArea(content)

    setUpdating({state: true, paragraph: index})
  }

  const deleteParagraph = () => {
    setBlockText((state) => {
      const copyBlockText = state

      return copyBlockText.filter((_, index) => index !== updating.paragraph)
    })

    setTextArea("")
    setUpdating({state: false, paragraph: null})
  }

  const handleSumbitLecture = async () => {
    const sanityBlockText = blockText.filter((block) => block.content !== '').map(({content, type}, index) => ({
      _type: type,
      style: type === 'block' ? 'normal' : null,
      children: type === 'block' ? [
        {
          _type: 'span',
          text: content,
          marks: []
        }
      ] : null,
      asset: type === 'image' || type === "file" ? {
        _type: 'reference',
        _ref: content,
        _key: Math.floor(Math.random()*900012032497671236+1).toString()
      } : null,
      _key: Math.floor(Math.random()*530012032497671236+1).toString()
    }))

    console.log('sanityBlockText', sanityBlockText)

    try {
      setLoading(true)
      await submitLecture([...sanityBlockText], title, userId?.toString() as string)
      toast.success("Lecture submitted successfully")
    } catch (error) {
      console.log('error', error)
      toast.error("error submitting lecture")
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = () => {
          const input = document.createElement("input")
          input.type = 'file'
  
          input.addEventListener('change', async () => {
              const file = input.files?.[0]
              const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "application/pdf"]
  
              if(file) {
                  try {
                      if(!allowedTypes.includes(file.type)) return toast.error("File type not allowed")
                      setUploadingFile(true)
                      console.log('file', file)
                      const fileAsset = await client.assets.upload("file", file, {contentType: file.type, filename: file.name, preserveFilename: true})

                      const urlObject = URL.createObjectURL(file)
                      setBlockText([...blockText, {type: fileType(file.type), content: fileAsset._id, urlObject, filename: file.name}])
                  } catch (error) {
                      console.log('error', error)
                      toast.error("Error uploading file. Please try again later")
                  } finally {
                      setUploadingFile(false)
                  }
              }
          })
  
          input.click()
      }

  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='col-span-4 md:col-span-1 w-full flex flex-col gap-4'>
        <label htmlFor="title">Lecture title</label>
        <textarea
          value={title}
          id="title"
          placeholder='add a lecture title here'
          onChange={({target}) => setTitle(target.value)}
          className='w-full rounded-lg outline-none placeholder:text-xl'
          rows={2}
        />
        <textarea
          className='border w-full rounded-lg p-4'
          placeholder='add a paragraph here...'
          rows={3}
          value={textarea}
          onChange={({target}) => setTextArea(target.value)}
        ></textarea>

        <div className='flex flex-row justify-between items-center'>
          <Button handleOnClick={updating.state ? updateParagraph : addParagraph} primary classes={"rounded-lg flex flex-row justify-center items-center gap-2"}>
            <p>{updating.state ? 'update' : 'add'}</p>
            {updating.state ? (<MdUpdate size={20} />) : (<BiPlus size={20} />)}
          </Button>

          {!updating.state && (
            <Button classes='cursor-pointer text-gray-400 rounded-lg' handleOnClick={handleFileSelect}>
              <CgAttachment size={20} />
            </Button>
          )}

          {updating.state && (
            <Button handleOnClick={deleteParagraph} primary classes={"bg-red-500 rounded-lg flex flex-row justify-center items-center gap-2"}>
              <p>Delete</p>
              <TbTrash size={20} />
            </Button>
          )}
        </div>

        <div>
          <Button
            handleOnClick={handleSumbitLecture}
            primary
            classes={"rounded-lg"}
            fullWidth
            loading={loading}
            disabled={loading || title === ""}
          >
            Submit Lecture
          </Button>
        </div>
      </div>
      <div className='col-span-3 hidden md:flex flex-col gap-4'>
        <div className=''>
          <h1 className='font-bold text-3xl text-center first-letter:uppercase'>{title ? title : 'add a title'}</h1>
        </div>

        <div className='w-[60%] mx-auto cursor-default'>
          {blockText.map(({type, content, urlObject, filename}, index) => (
            type === "block" ? (
              <p
                key={index}
                className='cursor-pointer hover:outline-2 rounded-lg p-2'
                onClick={() => handleEditParagraph(content as string, index)}
              >
                {content as string}
              </p>
            ) : type === "image" ? (
              <div className='relative h-auto w-auto min-h-[400px] min-w-[600px]'>
                <Image
                  src={urlObject!}
                  alt='uploaded file'
                  fill
                  className='object-cover h-auto w-auto rounded-lg'
                />
              </div>
            ) : (
              <div className='h-[200px] w-full rounded-lg relative bg-gray-200'>
                <div className='h-full w-full flex flex-col justify-center items-center'>
                  <CgAttachment size={50*2} color='gray' />
                </div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center items-center gap-2'>
                  <FiFileText size={30} />
                  <p className='text-2xl font-bold'>{filename}</p>
                </div>
              </div>
            )
          ))}
          {uploadingFile && 
            <Skeleton className='rounded-lg w-full' height={200} />}
        </div>
      </div>
    </div>
  )
}

type TextAreaProps = {
  value: string
  onChange: () => void
}

const TextArea = ({value, onChange}: TextAreaProps) => {
  return (
    <textarea
        value={value}
        onChange={onChange}
        className='border w-full rounded-lg p-4'
        placeholder='add a paragraph here...'
        rows={3}
      >
      </textarea>
  )
}

const FileUploader = ({handleOnClick}: {handleOnClick: () => void}) => {
  return (
    <div onClick={handleOnClick} className='w-full border border-gray-400 rounded-lg flex flex-col justify-center items-center'>
      <div>
        <BiUpload size={50} color='#99a1af' />
      </div>
      <h1 className='text-gray-400'>Upload a file (video/picture/document)</h1>
    </div>
  )
}
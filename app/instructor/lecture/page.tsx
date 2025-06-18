"use client"

import { Button } from '@/components'
import useSchool from '@/hooks/useSchool'
import { createQuestion, submitLecture } from '@/services/sanity'
import { useUser } from '@/store'
import { fileType } from '@/utils'
import { client } from '@/utils/sanity'
import { File } from 'buffer'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiAddToQueue, BiHeading, BiPaperPlane, BiPlus, BiUpload } from 'react-icons/bi'
import { BsQuestionLg } from 'react-icons/bs'
import { CgAttachment } from 'react-icons/cg'
import { FiFileText } from 'react-icons/fi'
import { LuHeading1, LuHeading2 } from 'react-icons/lu'
import { MdUpdate } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

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
  const [headerActive, setHeaderActive] = useState({type: '', active: false})
  const [question, setQuestion] = useState(false)

  const [educationType, setEducationType] = useState("")
  const [subject, setSubject] = useState("")
  const [course, setCourse] = useState("")
  const [form, setForm] = useState("")
  const [level, setLevel] = useState("")

  const {getSubjects, levels, forms} = useSchool()
  

  const [loading, setLoading] = useState(false)

  const {userId} = useUser()

  const addParagraph = () => {
    if(blockText[blockText.length-1]) {
      setBlockText([...blockText, {type: question ? 'blockquote' : headerActive.active ? headerActive.type : 'block', content: textarea}])
      setTextArea("")
      setHeaderActive({type: '', active: false})
      setQuestion(false)
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
    setHeaderActive({type: '', active: false})
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
      _type: type === 'h1' || type === "h2" || type === "blockquote" ? 'block' : type,
      style: type === 'block' ? 'normal' : type === 'h1' || type === "h2" || type === "blockquote" ? type : null,
      children: type === 'block' || type === 'h1' || type === "h2" || type === "blockquote" ? [
        {
          _type: 'span',
          text: content,
          marks: []
        }
      ] : null,
      asset: type === 'image' || type === "file" ? {
        _type: 'reference',
        _ref: content,
        _key: uuidv4()
      } : null,
      _key: uuidv4()
    }))

    console.log('sanityBlockText', sanityBlockText)

    try {
      setLoading(true)
      blockText.filter((block) => block.type === "blockquote").forEach(async (block, index) => await createQuestion(block.content as string, educationType, subject, course, form, level, userId?.toString() as string))
      await submitLecture([...sanityBlockText], title, userId?.toString() as string, educationType, subject, course, level, form)
      setBlockText([{ type: 'block', content: '' }])
      setEducationType("")
      setSubject("")
      setCourse("")
      setForm("")
      setLevel("")
      setTitle("")
      setBlockText([{ type: 'block', content: '' }])
      toast.success("Lecture submitted successfully")
    } catch (error) {
      console.log('error', error)
      toast.error("error submitting lecture")
    } finally {
      setLoading(false)
    }
  }

  const toggleHeader1 = () => setHeaderActive({type: 'h1', active: !headerActive.active})
  const toggleHeader2 = () => setHeaderActive({type: 'h2', active: !headerActive.active})
  const toggleQuestion = () => setQuestion(!question)

  
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
                      const fileAsset = await client.assets.upload(file.type.includes("image") ? "image" : "file", file, {contentType: file.type, filename: file.name, preserveFilename: true})

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
        <div className='h-10 w-full flex flex-row justify-start items-center gap-2'>
          <button onClick={toggleHeader1} className={`h-10 w-10 border rounded flex flex-col items-center justify-center text-center ${headerActive.type === "h1" && headerActive.active && 'bg-primary/50'}`}>
            <LuHeading1 color='gray'/>
          </button>
          <button onClick={toggleHeader2} className={`h-10 w-10 border rounded flex flex-col items-center justify-center text-center ${headerActive.type === "h2" && headerActive.active && 'bg-primary/50'}`}>
            <LuHeading2 color='gray'/>
          </button>
          <button onClick={toggleQuestion} className={`h-10 w-10 border rounded flex flex-col items-center justify-center text-center ${question && 'bg-primary/50'}`}>
            <BsQuestionLg color='gray'/>
          </button>
        </div>
        <textarea
          className='border w-full rounded-lg p-4'
          placeholder={headerActive.active ? 'add a heading here...' : 'add a paragraph here...'}
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

        <div className='my-2 w-full'>
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

        <div>
          <Button
            handleOnClick={handleSumbitLecture}
            primary
            classes={"rounded-lg"}
            fullWidth
            loading={loading}
            disabled={loading || title === "" || (course === "" && subject === "") || (form === "" && level === "") || educationType === ""}
          >
            Submit Lecture
          </Button>
        </div>
      </div>
      <div className='col-span-3 hidden md:flex flex-col gap-4 h-[calc(100vh-1rem)] relative overflow-y-scroll'>
        <div className=''>
          <h1 className='font-bold text-3xl text-center first-letter:uppercase'>{title ? title : 'add a title'}</h1>
        </div>

        <div className='w-[60%] mx-auto cursor-default flex flex-col justify-start items-start gap-2'>
          {blockText.map(({type, content, urlObject, filename}, index) => (
            type === "block" ? (
              <p
                key={index}
                className='cursor-pointer hover:outline-2 rounded-lg p-2 whitespace-pre-wrap'
                onClick={() => handleEditParagraph(content as string, index)}
              >
                {content as string}
              </p>
            ) : type === "image" ? (
              <div className='relative h-auto w-auto min-h-[400px] min-w-[600px]'>
                <Image
                  src={urlObject!}
                  alt='uploaded file'
                  key={index}
                  fill
                  className='object-cover h-auto w-auto rounded-lg'
                />
              </div>
            ) : type === "h1" ? (
              <h1
                key={index}
                className='cursor-pointer hover:outline-2 rounded-lg p-2 font-bold text-2xl'
                onClick={() => {
                  setHeaderActive({type: 'h1', active: true})
                  return handleEditParagraph(content as string, index)
                }}
              >
                {content as string}
              </h1>
            ) : type === "h2" ? (
              <h2
                key={index}
                className='cursor-pointer hover:outline-2 rounded-lg p-2 font-bold text-xl'
                onClick={() => {
                  setHeaderActive({type: 'h2', active: true})
                  return handleEditParagraph(content as string, index)
                }}
              >
                {content as string}
              </h2>
            ) : type === "blockquote" ? (
              <div key={index} className='p-4 bg-gray-200 border-s-2 border-primary w-full'>
                <p className='font-semibold text-primary'>{content as string}</p>
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
"use client"

import { Button } from '@/components'
import useSchool from '@/hooks/useSchool'
import { createQuestion } from '@/services/sanity'
import { useUser } from '@/store'
import React, { useState } from 'react'
import { toast } from 'sonner'

export default function CreateQuestion() {
    const [question, setQuestion] = useState("")
    const [educationType, setEducationType] = useState("")
    const [subject, setSubject] = useState("")
    const [course, setCourse] = useState("")
    const [form, setForm] = useState("")
    const [level, setLevel] = useState("")

    const [loading, setLoading] = useState(false)

    const {getSubjects, levels, forms} = useSchool()

    const {userId} = useUser()

    const submitQuestion = async () => {
        try {
            setLoading(true)
            await createQuestion(question, educationType, subject || null, course || null, form || null, level || null, userId?.toString() as string)
            setQuestion("")
            setEducationType("")
            setSubject("")
            setCourse("")
            setForm("")
            setLevel("")

            toast.success("Successfully created question")
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='w-full md:max-w-9/12 mx-auto flex flex-col gap-4 justify-start items-center'>
        <h1 className='poppins-bold text-xl mt-4'>Fill the fields to create a question for students</h1>
        <div className='w-full md:w-2/3'>
            <label htmlFor="">Question</label>
        </div>
        <textarea
            name=""
            id=""
            className='w-full md:w-2/3 border rounded-lg outline-primary p-4'
            rows={4}
            value={question}
            onChange={({target}) => setQuestion(target.value)}
        ></textarea>

        <div className='w-full md:w-2/3'>
            <label htmlFor="">Education Type</label>
        </div>
        <select onChange={({target}) => setEducationType(target.value)} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full md:w-2/3'>
            <option value=""></option>
            <option value="secondary">Secondary</option>
            <option value="professional">Professional</option>
        </select>

        {educationType === "secondary" && (
            <>
                <div className='w-full md:w-2/3'>
                    <label htmlFor="">Subject</label>
                </div>
                <select onChange={({target}) => {
                    setSubject(target.value)
                    setCourse("")
                }} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full md:w-2/3'>
                    <option value=""></option>
                    {getSubjects(educationType)?.map(({subject}, index) => (
                        <option key={index} value={subject.toLowerCase()} className='capitalize'>{subject}</option>
                    ))}
                </select>
            </>
        )}

        {educationType === "professional" && (
            <>
            <div className='w-full md:w-2/3'>
                <label htmlFor="">Course</label>
            </div>
            <select onChange={({target}) => {
                setCourse(target.value)
                setSubject("")
            }} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full md:w-2/3'>
                <option value=""></option>
                {getSubjects(educationType)?.map(({subject}, index) => (
                    <option key={index} value={subject.toLowerCase()} className='capitalize'>{subject}</option>
                ))}
            </select>
            </>
        )}

        {educationType === "secondary" && (
            <>
            <div className='w-full md:w-2/3'>
                <label htmlFor="">Form</label>
            </div>
            <select onChange={({target}) => {
                setForm(target.value)
                setLevel("")
            }} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full md:w-2/3'>
                <option value=""></option>
                {forms.map((form, index) => (
                    <option key={index} value={form} className='capitalize'>{form}</option>
                ))}
            </select>
            </>
        )}

        {educationType === "professional" && (
            <>
            <div className='w-full md:w-2/3'>
                <label htmlFor="">Level</label>
            </div>
            <select onChange={({target}) => {
                setLevel(target.value)
                setForm("")
            }} name="" id="" className='border rounded-lg outline-primary p-2 px-6 w-full md:w-2/3'>
                <option value=""></option>
                {levels.map(({value, title}, index) => (
                    <option key={index} value={value} className='capitalize'>{title}</option>
                ))}
            </select>
            </>
        )}

        <Button
            handleOnClick={submitQuestion}
            primary
            classes={"w-full md:w-fit rounded-lg"}
            disabled={question === "" || (course === "" && subject === "") || (form === "" && level === "") || educationType === "" || loading}
            loading={loading}
        >
            Submit
        </Button>

    </div>
  )
}

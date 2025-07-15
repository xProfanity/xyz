"use client"

import { Button } from "@/components"
import { WeekDates } from "./week-dates"
import { SubjectProgress } from "./student-progress"
import NotificationLogs from "./NotificationLogs"
import {useEffect, useState} from "react"
import {useUser} from "@/store"
import {fetchLecturesByEducationType} from "@services/sanity"
import {toast} from "sonner"
import Link from "next/link"
import {Lecture} from "@/types"

export const Schedules = ({studentType}: {studentType: "secondary" | "professional" | undefined}) => {
	
	const [availableLectures, setAvailableLectures] = useState<Lecture[] | null>(null)
	const {studentType: educationType, form, course} = useUser()


	useEffect(() => {
		const fetchAvailableLectures = async () => {
			try {
					const response = await fetchLecturesByEducationType(educationType as string, form, course) 				
					setAvailableLectures(response)
			} catch (error) {
			console.log("error", error);
			toast.error("Failed to fetch lectures")	
			}
		}
		
		fetchAvailableLectures()
	}, [])
	return (
		<div className="flex flex-col justify-start  gap-4 h-full">
			<div className="h-12 w-full flex flex-col justify-center items-start">
				<h1 className="poppins-bold text-2xl">My schedules</h1>
			</div>

			<WeekDates />

			<NotificationLogs availableLectures={availableLectures} />

			<div className="flex flex-row flex-wrap gap-4">
				 {availableLectures?.map((lecture, index) => (
						<Link href={`/lecture/${lecture._id}`} className="py-2 px-4 rounded-full bg-pink-200" key={index}>
							<p className="text-gray-500">{lecture.subject}</p>
					</Link>
				))}
			</div>

		{/*	<div className="mt-8">
				<Button handleOnClick={() => {}} primary classes={"rounded-lg hover:bg-primary/90"}>
					Start planning
				</Button>
			</div> */}
		</div>
	)
}

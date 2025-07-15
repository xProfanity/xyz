"use client"
import Link from "next/link"

export default function NotificationLogs({availableLectures}: {availableLectures: Lecture[] | null}) {
  return (
    <div>
			{availableLectures ? (
				availableLectures.length > 0 ? (
				<p className="text-gray-500">You have <Link href="/student/lectures/"><span className="text-primary font-bold">{availableLectures.length} lecture{availableLectures.length !== 1 && 's'}</span></Link> ready for you</p>
				) : (
					<p className="text-gray-400">You don't have any lectures at the moment</p>
				)
			) : (
				<p className="text-gray-400">Loading...</p>
			)}
		</div>
  )
}


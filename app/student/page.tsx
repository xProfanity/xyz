"use client"

import { useUser } from "@/store";
import { Statistics } from "./statistics";
import { WorkField } from "./workfield";
import { Schedules } from "./schedule";

export default function Home() {
  
  const {studentType, profileId, userId} = useUser((state) => state)
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-5 gap-4 mt-4 h-auto">
      <div className="col-span-2 hidden md:block">
        <Statistics studentType={studentType} />
      </div>
      <div className="col-span-3 bg-[#F0EFF4] rounded-3xl flex flex-col lg:grid lg:grid-cols-2 p-6 gap-4 h-auto">
        <div className="col-span-1 w-full">
          <WorkField studentType={studentType} profileId={profileId} userId={userId} />
        </div>
        <div className="hidden md:block md:col-span-1">
          <Schedules studentType={studentType} />
        </div>
      </div>
    </div>
  )
}

// const TabsAll = () => {
//   const {studentType, profileId, userId} = useUser((state) => state)
//   return (
//     <div className="flex flex-col-reverse md:grid md:grid-cols-5 gap-4 mt-4 h-full">
//       <div className="col-span-2 hidden md:block">
//         <Statistics studentType={studentType} />
//       </div>
//       <div className="col-span-3 bg-[#F0EFF4] rounded-3xl flex flex-col lg:grid lg:grid-cols-2 p-6 gap-4 h-full">
//         <div className="col-span-1 w-full">
//           <WorkField studentType={studentType} profileId={profileId} userId={userId} />
//         </div>
//         <div className="hidden md:block md:col-span-1">
//           <Schedules studentType={studentType} />
//         </div>
//       </div>
//     </div>
//   )
// }

// const TabsLectures = () => {

//   const [lectures, setLectures] = useState<Lecture[] | null>(null)
//   const {active} = useTabs()

//   const [fetching, setFetching] = useState(false)

//   const {studentType: educationType} = useUser()
//   useEffect(() => {
//     const handleFetchLectures = async () => {
//       try {
//         setFetching(true)
//         const response = await fetchLecturesByEducationType(educationType as string)
//         setLectures(response)
//       } catch (error) {
//         console.log('error', error)
//         toast.error("error fetching lectures")
//       } finally {
//         setFetching(false)
//       }
//     }

//     if(active === "lectures") {
//       handleFetchLectures()
//     }
//   }, [active])

//   return (
//     <div className="flex flex-row flex-wrap gap-4 w-full mt-4">
//         {!lectures?.length && (
//           <div className="w-full flex flex-col justify-center items-center">
//             <p className="text-lg text-gray-400">No {educationType === "professional" ? "lectures" : "classes"} available {educationType === "professional" && "for your program"} yet!</p>
//           </div>
//         )}
        
//         {lectures?.map((lecture, index) => (
//           <Link href={`/lecture/${lecture._id}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col p-4">
//             <h1>{lecture.title}</h1>

//             <div className="mt-2">
//               <p className="font-bold text-lg">{lecture.subject || lecture.course}</p>
//             </div>

//             <p className="mt-2 text-gray-400">{dayjs(lecture._createdAt).format("DD MMMM, YYYY")}</p>
//           </Link>
//         ))}
//         {fetching && (
//           [...Array(4)].map((_, index) => (
//             <Skeleton height={500} width={300} className="rounded-lg" />
//           ))
//         )}
//     </div>
//   )
// }

// const TabsBooks = () => {
//   const [resources, setResources] = useState<Resource[] | null>(null)
//   const {active} = useTabs()

//   const [fetching, setFetching] = useState(false)

//   const {studentType: educationType} = useUser()
//   useEffect(() => {
//     const handleFetchLectures = async () => {
//       try {
//         setFetching(true)
//         const response = await fetchResourcesByEducationType(educationType as string)
//         setResources(response)
//       } catch (error) {
//         console.log('error', error)
//         toast.error("error fetching lectures")
//       } finally {
//         setFetching(false)
//       }
//     }

//     if(active === "books") {
//       handleFetchLectures()
//     }
//   }, [active])

//   return (
//     <div className="flex flex-row flex-wrap gap-4 w-full mt-4">
//         {resources?.map((resource, index) => (
//           resource.document.cover.coverUrl ? (
//             <Link href={`${resource.document.cover.fileUrl}/?dl=lecture-${resource.document.cover.fileName}`} className="relative rounded-lg cursor-pointer">
//               <div className="relative h-[200px] w-[350px]">
//                 <Image
//                   src={resource.document.cover.coverUrl!}
//                   alt={resource.document.cover.coverName!}
//                   fill
//                   className="object-fill rounded-lg"
//                 />
//               </div>
//             </Link>
//           ) : (
//             <Link href={`${resource.document.cover.fileUrl}/?dl=lecture-${resource.document.cover.fileName}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col justify-between p-4">
//               <h1>{resource.title}</h1>

//               {/* <div>
//                 <div className="mt-2">
//                   <p className="font-bold text-lg">{resource..subject || question.course}</p>
//                 </div>
//                 <div className="mt-2 flex flex-row justify-between items-center">
//                   <p className="text-gray-400">{dayjs(question._createdAt).format("DD MMMM, YYYY")}</p>
//                   <p>{question.submissions?.length || 0} answer{question.submissions?.length !== 1 && 's'}</p>
//                 </div>
//               </div> */}
//             </Link>
//           )
//         ))}
//         {fetching && (
//           [...Array(4)].map((_, index) => (
//             <Skeleton height={500} width={300} className="rounded-lg" />
//           ))
//         )}
//     </div>
//   )
// }

// const TabsQuizzes = () => {
//   const [questions, setQuestions] = useState<Question[] | null>(null)
//   const {active} = useTabs()

//   const [fetching, setFetching] = useState(false)

//   const {studentType: educationType} = useUser()
//   useEffect(() => {
//     const handleFetchLectures = async () => {
//       try {
//         setFetching(true)
//         const response = await fetchQuestionsByEducationType(educationType as string)
//         setQuestions(response)
//       } catch (error) {
//         console.log('error', error)
//         toast.error("error fetching lectures")
//       } finally {
//         setFetching(false)
//       }
//     }

//     if(active === "quizzes") {
//       handleFetchLectures()
//     }
//   }, [active])

//   return (
//     <div className="flex flex-row flex-wrap gap-4 w-full mt-4">
//         {questions?.map((question, index) => (
//           <Link href={`/question/${question._id}`} key={index} className="w-[300px] rounded-lg bg-gray-300 hover:bg-gray-300/70 cursor-pointer flex flex-col justify-between p-4">
//             <h1>{question.question}</h1>

//             <div>
//               <div className="mt-2">
//                 <p className="font-bold text-lg">{question.subject || question.course}</p>
//               </div>
//               <div className="mt-2 flex flex-row justify-between items-center">
//                 <p className="text-gray-400">{dayjs(question._createdAt).format("DD MMMM, YYYY")}</p>
//                 <p>{question.submissions?.length || 0} answer{question.submissions?.length !== 1 && 's'}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//         {fetching && (
//           [...Array(4)].map((_, index) => (
//             <Skeleton height={500} width={300} className="rounded-lg" />
//           ))
//         )}
//     </div>
//   )
// }
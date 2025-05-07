import { HiBookOpen } from "react-icons/hi"

export const Statistics = ({studentType}: {studentType: string | undefined}) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-1 flex flex-col justify-center items-center gap-3 sm:gap-5 rounded-3xl bg-[#E4F5E0] bg-[url('/certificate.svg')] relative bg-cover bg-left-bottom bg-no-repeat sm:h-56">
            <span className="poppins-bold text-3xl sm:text-6xl">0</span>
            <h1 className="text-gray-600 text-xs sm:text-base">Certificates</h1>
  
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center gap-3 sm:gap-5 rounded-3xl bg-[#F9EFDE] bg-[url('/category.svg')] relative bg-cover bg-left-bottom bg-no-repeat sm:h-56">
            <span className="poppins-bold text-3xl sm:text-6xl">0</span>
            <h1 className="text-gray-600 text-xs sm:text-base">{studentType?.toLowerCase() === "professional" ? 'courses' : 'subjects'}</h1>
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center gap-3 sm:gap-5 rounded-3xl bg-[#F3DEFA] bg-[url('/time.svg')] relative bg-cover bg-left-bottom bg-no-repeat sm:h-56">
            <span className="poppins-bold text-3xl sm:text-6xl">0</span>
            <h1 className="text-gray-600 text-xs sm:text-base">hours</h1>
          </div>
        </div>
  
        <div className="col-span-3 rounded-3xl h-36 p-4 bg-[#ECDEFA] bg-[url('/flower.svg')] relative bg-cover bg-left-bottom bg-no-repeat">
          <h1 className="inline-flex gap-2 justify-center items-center poppins-semibold"><span><HiBookOpen size={35} color="#4D417C" /></span> Learnings today</h1>
  
          <h1 className="poppins-semibold text-xl"><span className="poppins-bold text-6xl">0</span> min</h1>
        </div>
  
        <div className="col-span-3 h-40 p-4 bg-[#F7D5EA] rounded-3xl bg-[url('/yflower.svg')] relative bg-contain bg-right-bottom bg-no-repeat">
          <h1 className="poppins-bold text-3xl">Topics covered</h1>
          <h1 className="poppins-semibold"><span className="poppins-bold text-6xl">0</span> topics</h1>
        </div>
  
        <div className="col-span-3 h-40 -mt-14 p-4 bg-[#E4DFFF] rounded-3xl bg-[url('/yflower.svg')] relative bg-contain bg-right-bottom bg-no-repeat"> 
          <h1 className="poppins-bold text-3xl">Tutors interacted with</h1>
          <h1 className="poppins-semibold"><span className="poppins-bold text-6xl">0</span> tutors</h1>
        </div>
      </div>
    )
  }
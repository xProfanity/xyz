import type { Metadata } from "next";
import Image from "next/image";

import { GiChoice, GiHamburgerMenu } from "react-icons/gi";
import { HiBookOpen } from "react-icons/hi";
import { MdOutlineSubject } from "react-icons/md";
import { RiHome4Fill, RiProgress7Line } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";

import { Filters, HamburgerMenu, Header, NavButtons, NavLink, Sidebar, StudentName } from "@/components";
import "../globals.css";
import { CiSettings } from "react-icons/ci";
import { GrSchedule } from "react-icons/gr";
import { LuNotebookPen } from "react-icons/lu";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "ExcellenceMW Dashboard",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode}>) {

  const studentNavLinks = [
    {
      name: 'questions',
      link: '/student',
      icon: <LuNotebookPen size={20} />,
    },
    {
      name: 'Progress',
      link: '/student/progress',
      icon: <RiProgress7Line size={20} />,
    },
    {
      name: 'schedule',
      link: '/student/schedule',
      icon: <GrSchedule size={20} />,
    },
    {
      name: 'settings',
      link: '/student/settings',
      icon: <CiSettings size={20} />,
    },
]

  return (
        <div className="sm:px-2 w-auto relative block">
          <Sidebar />
          <div className="relative px-2 sm:px-0 h-auto w-full flex flex-col justify-center items-center bg-[#F0EFF4] shadow">
            <div className="w-full mx-auto h-16 flex flex-row justify-between items-center">
              <Link href="/student">
                <Image
                  src={"/logo.png"}
                  height={100}
                  width={80}
                  alt="Excellence Logo"
                  className="object-cover block"
                  blurDataURL=""
                />
              </Link>
              
              <div className="flex md:hidden">
                <HamburgerMenu />
              </div>
              <div className="hidden md:flex flex-row justify-center items-center">
                <div className="flex flex-col justify-center items-end">
                  <StudentName />
                  <div className="flex flex-row justify-center items-center">
                    <div className="h-2 w-40 rounded-full bg-gray-200">
                      <div className="bg-primary rounded-full w-1/3 h-full"></div>
                    </div>
                    <div><HiBookOpen size={35} color="pink" /></div>
                  </div>
                </div>
                {/* <div className="rounded-full flex flex-col justify-center items-center ml-4">
                  <BiCalendar size={20} />
                </div>
                <div className="rounded-full flex flex-col justify-center items-center ml-1">
                  <BsBell size={20} />
                </div> */}
              </div>
            </div>
          </div>
          <div className="rounded-3xl w-full p-2 md:p-8 mt-0 md:mt-6">
            <NavButtons />

            <div className="hidden  md:flex flex-col md:flex-row justify-start md:justify-between md:items-center">
              <Header />
              <Filters />
            </div>
            <main className="md:pb-0 pb-24 h-[40rem] sm:h-auto">{children}</main>

            <section className="block md:hidden fixed bottom-0 left-0 w-full bg-[#F0EFF4] rounded-t-xl">
              <ul className="flex flex-row justify-around items-center py-6">
                {studentNavLinks.map((link, index) => (
                  <NavLink name={link.name} link={link.link} icon={link.icon} index={index} key={index}/>
                ))}
              </ul>
            </section>
          </div>
        </div>
  );
}

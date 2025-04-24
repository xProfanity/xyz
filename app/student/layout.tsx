import type { Metadata } from "next";
import Image from "next/image";

import { GiHamburgerMenu } from "react-icons/gi";
import { HiBookOpen } from "react-icons/hi";
import { MdOutlineSubject } from "react-icons/md";
import { RiHome4Fill, RiProgress7Line } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";

import { Filters, HamburgerMenu, Header, NavLink, Sidebar, StudentName } from "@/components";
import "../globals.css";

export const metadata: Metadata = {
  title: "Home",
  description: "ExcellenceMW Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const studentNavLinks = [
    {
      name: 'dashboard',
      link: '/student',
      icon: <RiHome4Fill size={20} />,
    },
    {
      name: 'Subjects',
      link: '/student/subjects',
      icon: <MdOutlineSubject size={20} />,
    },
    {
      name: 'Progress',
      link: '/student/progress',
      icon: <RiProgress7Line size={20} />,
    },
    {
      name: 'subscription',
      link: '/student/subscription',
      icon: <TbCategory size={20} />,
    },
]

  return (
        <div className="sm:px-2 w-auto relative block">
          <Sidebar />
          <div className="relative px-2 sm:px-0 h-auto w-full flex flex-col justify-center items-center bg-[#F0EFF4] shadow">
            <div className="w-full mx-auto h-16 flex flex-row justify-between items-center">
              <Image
                src={"/logo.png"}
                height={100}
                width={80}
                alt="Excellence Logo"
                className="object-cover hidden md:block "
                blurDataURL=""
              />
              <h1 className="block md:hidden poppins-semibold text-lg">Excellence</h1>
              <div className="hidden md:block">
                <ul className="flex flex-row gap-6">
                  {studentNavLinks.map((link, index) => (
                    <li className="" key={index}>
                      <NavLink name={link.name} link={link.link} icon={link.icon} index={index} />
                    </li>
                  ))}
                </ul>
              </div>
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
          <div className="bg-[#FCF9FE] rounded-3xl w-full p-2 md:p-8 mt-0 md:mt-10">
            <div className="hidden  md:flex flex-col md:flex-row justify-start md:justify-between md:items-center">
              <Header />
              <Filters />
            </div>
            <main className="md:pb-0 pb-24">{children}</main>

            <section className="block md:hidden fixed bottom-0 left-0 w-full bg-[#FFFFFF] rounded-t-xl">
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

import type { Metadata } from "next";
import Image from "next/image";

import { BiCalendar } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiBookOpen } from "react-icons/hi";
import { MdOutlineSubject } from "react-icons/md";
import { RiHome4Fill, RiProgress7Line } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";

import { Filters, Header, NavLink, StudentName } from "@/components";
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
      icon: <RiHome4Fill size={35} />,
    },
    {
      name: 'Subjects',
      link: '/student/subjects',
      icon: <MdOutlineSubject size={35} />,
    },
    {
      name: 'Progress',
      link: '/student/progress',
      icon: <RiProgress7Line size={35} />,
    },
    {
      name: 'subscription',
      link: '/student/subscription',
      icon: <TbCategory size={35} />,
    },
]

  return (
    <html lang="en">
      <body
        className={`p-2`}
      >
        <div className="h-auto w-full flex flex-col justify-center items-center">
          <div className="w-full h-20 flex flex-row justify-between items-center">
            <Image
              src={"/logo.png"}
              height={120}
              width={120}
              alt="Excellence Logo"
              className="object-cover hidden md:block"
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
              <button>
                <GiHamburgerMenu size={35} />
              </button>
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
              <div className="md:h-20 md:w-20 rounded-full md:border border-black flex flex-col justify-center items-center ml-4">
                <BiCalendar size={35} />
              </div>
              <div className="md:h-20 md:w-20 rounded-full md:border border-black flex flex-col justify-center items-center ml-1">
                <BsBell size={35} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-pink-50 dark:bg-transparent w-full p-2 md:p-8 mt-10">
          <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center">
            <Header />
            <Filters />
          </div>
          <main>{children}</main>

          <section className="block md:hidden fixed bottom-0 left-0 w-full">
            <ul className="flex flex-row justify-around items-center py-6">
              {studentNavLinks.map((link, index) => (
                <NavLink name={link.name} link={link.link} icon={link.icon} index={index} key={index}/>
              ))}
            </ul>
          </section>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Image from "next/image";

import { Filters, Header, NavLink } from "@/components";
import { MdOutlineSubject } from "react-icons/md";
import { RiHome4Fill, RiProgress7Line } from "react-icons/ri";
import { SlSettings } from "react-icons/sl";
import { TbCategory } from "react-icons/tb";

import { BiCalendar } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { HiBookOpen } from "react-icons/hi";
import "./globals.css";

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
      link: '/',
      icon: <RiHome4Fill size={35} />,
    },
    {
      name: 'Subjects',
      link: '/subjects',
      icon: <MdOutlineSubject size={35} />,
    },
    {
      name: 'Progress',
      link: '/progress',
      icon: <RiProgress7Line size={35} />,
    },
    {
      name: 'subscription',
      link: '/subscription',
      icon: <TbCategory size={35} />,
    },
    {
      name: 'calendar',
      link: '/calendar',
      icon: <BiCalendar size={35} />,
    },
    {
      name: 'Settings',
      link: '/settings',
      icon: <SlSettings size={35} />,
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
              className="object-cover"
              blurDataURL=""
            />
            <div>
              <ul className="flex flex-row gap-6">
                {studentNavLinks.map((link, index) => (
                  <NavLink name={link.name} link={link.link} icon={link.icon} index={index} />
                ))}
              </ul>
            </div>
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-col justify-center items-end">
                <h1 className="poppins-bold">Hello !Name</h1>
                <div className="flex flex-row justify-center items-center">
                  <div className="h-2 w-40 rounded-full bg-gray-200">
                    <div className="bg-black rounded-full w-1/3 h-full"></div>
                  </div>
                  <div><HiBookOpen size={35} color="pink" /></div>
                </div>
              </div>
              <div className="h-20 w-20 rounded-full border border-black flex flex-col justify-center items-center ml-4">
                <BiCalendar size={35} />
              </div>
              <div className="h-20 w-20 rounded-full border border-black flex flex-col justify-center items-center ml-1">
                <BsBell size={35} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-pink-50 w-full p-8 mt-10">
          <div className="flex flex-row justify-between items-center">
            <Header />
            <Filters />
          </div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

"use client"

const studentNavLinks = [
    {
      name: 'home',
      link: '/',
    //   icon: <BiHome size={35} />,
    },
    {
      name: 'Subjects',
      link: '/subjects',
    //   icon: <MdOutlineSubject size={35} />,
    },
    {
      name: 'Progress',
      link: '/progress',
    //   icon: <RiProgress7Line size={35} />,
    },
    {
      name: 'Settings',
      link: '/settings',
    //   icon: <SlSettings size={35} />,
    },
    {
      name: 'subscription',
      link: '/subscription',
    //   icon: <TbCategory size={35} />,
    },
]

export const BASEURL = "https://api.dev.excellencemalawi.com/api"

export const isUserLoggedIn = () => {
  return !!localStorage.getItem('access')
}

export const subjects = ["English","Mathematics","Geography","Chemistry","Physics","Biology"]

export const courses = ["ACCA","ABMA","ICAM","CILT","ABE",]
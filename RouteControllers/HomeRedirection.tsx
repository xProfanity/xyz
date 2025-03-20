"use client"

import { useUser } from "@/store"
import { usePathname, useRouter } from "next/navigation"

export default function HomeRedirection() {
  const pathname = usePathname()
  const {role} = useUser((state) => state)
  const router = useRouter()

  if(pathname === "/") {
    return router.push(role as string)
  }
}

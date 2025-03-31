import { cookies } from "next/headers"

export default async function Root() {
  const cookieStore = await cookies()
  const access = cookieStore.get('access')

  console.log('access', access)
  return (
    <div>page</div>
  )
}

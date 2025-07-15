import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const access = cookieStore.get('access')
    const role = cookieStore.get('role')

    const link = request.nextUrl.pathname

    if(!access?.value) {
        return NextResponse.redirect(new URL('/authentication/sign-in', request.url))
    }

    if(link === '/') {
        return NextResponse.redirect(new URL(`/${role?.value}`, request.url))
    }

    if(role?.value === 'student' || role?.value === 'tutor') {
        if(/^\/admin/.test(link)) {
            const url = link.replace(/^\/admin/, `/${role.value}`)

            return NextResponse.redirect(new URL(url, request.url))
        }

        if(role.value === 'student' && /^\/tutor/.test(link)) {
            const url = link.replace(/^\/tutor/, `/${role.value}`)

            return NextResponse.redirect(new URL(url, request.url))
        }

        if(role.value === 'tutor' && /^\/student/.test(link)) {
            const url = link.replace(/^\/student/, `/${role.value}`)

            return NextResponse.redirect(new URL(url, request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|authentication|onboarding|on-boarding-instructor|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
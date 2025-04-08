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

    if(role?.value === 'admin') {
        console.log(`user is a ${role.value}`);
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|authentication|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const access = cookieStore.get('access')

    if(!access) {
        return NextResponse.redirect(new URL('/authentication/sign-in', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|authentication|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
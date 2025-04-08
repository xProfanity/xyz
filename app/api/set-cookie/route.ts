import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const access = body.access
    const role = body.role

    const Cookies = await cookies()
    Cookies.set('access', access)
    Cookies.set('role', role)

    return NextResponse.json({message: "cookies set"})
}

export async function DELETE(request: NextRequest) {
    const cookieStore = await cookies()
    cookieStore.delete('access')
    cookieStore.delete('role')

    return NextResponse.redirect(new URL('/authentication/sign-in', request.url))
}
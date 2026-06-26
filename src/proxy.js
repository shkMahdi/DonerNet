import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from './app/lib/auth'

const adminOnlyPaths = ['/dashboard/all-requests', '/dashboard/all-user']

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const pathname = request.nextUrl.pathname
    const isAdminPath = adminOnlyPaths.some(path => pathname.startsWith(path))

    if (isAdminPath && session.user?.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

export const config = {
    matcher: [
        '/funding',
        '/dashboard',
        '/dashboard/my-requests',
        '/dashboard/profile',
        '/dashboard/all-requests',
        '/dashboard/all-user',
        '/donation-requests',
        '/donation-requests/:path*',
    ],
}
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from './app/lib/auth'

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}


export const config = {
    matcher: ['/funding', '/dashboard', '/dashboard/my-requests', '/dashboard/profile', '/donation-requests', '/donation-requests/:path*'],
}   
// import { NextResponse } from 'next/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = await request.cookies.get('blogToken')


    const protectedRoute = ['/admin/addblog', '/admin/blog-list', '/admin/subscribers']
    // console.log("midlware is having token  :", token?.value?);

    if (!token?.value && protectedRoute.some((route) => pathname.startsWith(route))) {
        // console.log("midlware token not having :", pathname);
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('error', 'login_required')
        return NextResponse.redirect(redirectUrl)
    }

    if (token?.value && (pathname === '/register' || pathname === '/login')) {
        return NextResponse.redirect(new URL('/', request.url))
    }


    return NextResponse.next()
}


export const config = {
    matcher: [
        '/',
        '/api/login',
        '/api/signup',
        '/api/logout',
        '/blog-details/:path*',
        '/login',
        '/register',
        '/admin/:path*'
    ]
}
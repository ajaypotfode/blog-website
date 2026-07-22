// import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
// import { url } from 'inspector';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})

const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(8, '10 s'),
    analytics: true
})


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // const token = await request.cookies.get('blogToken')

    const ip = process.env.NODE_ENV === "development" ? "127.0.0.1" :
        (request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1');

    const cleanIp = ip.split(',')[0].trim();

    const { success } = await rateLimit.limit(cleanIp);

    if (!success) {
        return new NextResponse('Too many requests!', {
            status: 429,
        });
    };

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    // console.log("token is :", token);



    const protectedRoute = [
        '/admin/add-blog',
        '/admin/blog-list',
        '/admin/subscribers',
        '/admin/saved',
        '/admin/myFeed'
    ]
    // console.log("midlware is having token  :", token?.value?);

    if (!token && protectedRoute.some((route) => pathname.startsWith(route))) {
        // console.log("midlware token not having :", pathname);
        const redirectUrl = new URL('/login', request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // console.log("token :",token);

    // if (token?.value && (pathname === '/register' || pathname === '/login')) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

    // const requestHeaders = new Headers(request.headers);

    // if (token) {
    //     // request.headers.set('x-user-id', token.id as string);
    //     // request.headers.set('x-internal-secret', process.env.NEXTAUTH_SECRET!);
    //     requestHeaders.set('x-user-id', token.id as string);
    //     requestHeaders.set('x-internal-secret', process.env.NEXTAUTH_SECRET!);
    // }


    return NextResponse.next({
        // request: {
        //     headers: requestHeaders
        // }
    })
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
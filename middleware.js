import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    const {pathname} =req.nextUrl;

    //allow request if following true

    //if token exists// its a request for  next auth session


    if(pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    if(!token && pathname !='/login') {
        let url = req.nextUrl.clone()
        url.pathname = '/login'

        let nurl = new URL('/login', req.url)
    
        return NextResponse.redirect(new URL('/login', req.url))

        // return NextResponse.redirect('http://localhost:3000/login')
    }

    //redirect them to login

    // if(!token && pathname !='/login') {
    //     const loginUrl = new URL('/login', req.url)
    //     // loginUrl.searchParams.set('from', pathname)
        
    //     return NextResponse.redirect(loginUrl)
    //     // return NextResponse.redirect('/login')
    // }

}

export const config = {
    matcher: '/',
  }
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const middleware = async (req: NextRequest) => {

    const cookieStore = await cookies();
    const protectedRoutes = ["/userview","makeappointment"];
    const publicRoutes = ["/signin", "/signup"];

    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = cookieStore.get("jwtsession")?.value;
    const session = await decrypt(cookie);

    //console.log(`req.nextURL is ${req.nextUrl}`);
    // console.log(`Session userID is ${session?.userId}`);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/userview", req.nextUrl));
    }

    return NextResponse.next();
}

export default middleware
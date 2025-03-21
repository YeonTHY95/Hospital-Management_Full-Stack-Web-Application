import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies} from 'next/headers';
import { decrypt } from "@/lib/session";
import OurServicesComponent from "@/components/ourservices";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hospital",
  description: "Hospital Web Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies() ;

  const session = cookieStore.get('jwtsession')?.value;

  const userID = await decrypt(session) ;

  console.log("userID from cookie is ", userID);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-between items-center ml-[5px] relative">
          <nav>
            <span className="">
              <Link href='/' className="navlinkstyle">Home </Link> 
              | <OurServicesComponent />
              | <Link href='/makeappointment'className="navlinkstyle">Make Appointment </Link> 
              | <Link href='/finddoctor'className="navlinkstyle">Find Doctor </Link> 
              | <Link href='/about'className="navlinkstyle">About Us</Link>
               {(userID ) && (<span> | <Link href='/userview'className="navlinkstyle">AccountView</Link></span>)}
            </span>
          </nav>
          { 
            (userID ) ? (<div className="flex justify-end items-center gap-[5px]">
                          <form action={async () => {'use server'; const cookieStore = await cookies(); cookieStore.delete("jwtsession"); redirect('/signin');}}>
                            <button className="flex h-[36px] items-center justify-center gap-2 rounded-md bg-cyan-300 p-3 m-[10px] text-sm font-bold hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                              Logout
                            </button>
                          </form>
                        </div>) : 
                  
                        (<div className="flex justify-end items-center gap-[5px]">
                          
                          <Link href='/signin' className="navlinkstyle">Sign In </Link> 
                        | <Link href='/signup' className="navlinkstyle pr-[5px]">Sign Up </Link> 
                        </div>)
          }
          
        </div>
        
        {children}
      </body>
    </html>
  );
}

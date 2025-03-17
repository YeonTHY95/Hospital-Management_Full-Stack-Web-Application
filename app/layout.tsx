import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav>
          <span className="">
            <Link href='/' className="text-xl font-bold text-green-300 decoration-sky-500 hover:bg-green-500 hover:text-white">Home </Link> 
            | <Link href='' className="text-xl font-bold text-green-300 decoration-sky-500 hover:bg-green-500 hover:text-white">Our Services </Link> 
            | <Link href='/makeappointment'className="text-xl font-bold text-green-300 decoration-sky-500 hover:bg-green-500 hover:text-white">Make an Appointment </Link> 
            | <Link href='/about'className="text-xl font-bold text-green-300 decoration-sky-500 hover:bg-green-500 hover:text-white">About Us</Link>
          </span>
        </nav>
        {children}
      </body>
    </html>
  );
}

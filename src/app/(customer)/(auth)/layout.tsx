import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../../globals.css'
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Login - Selamat Datang",
  description: "Generated by create next app",
};

export default async function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {session, user} = await getUser()

//   if(session && user.role === 'superadmin'){
//     return redirect ('/dashboard')
//   }

  return (
    <html lang="en">
    <body>{children}</body>
    </html>
  );
}
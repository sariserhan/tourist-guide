import "./globals.css";
import ConvexClientProvider from "@/providers/convex-client-provider";
import Logo from "@/components/logo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/toaster"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from "next/link";
import Messages from "@/components/messages";
import { currentUser } from "@clerk/nextjs/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NationChatter",
  description: "Learn and discuss about countries from locals",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser()
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className='absolute left-0 top-5 z-50'>
          <Logo />
        </div>
        <ConvexClientProvider>
          {/* <NavBar /> */}
          <div className='absolute right-5 top-7 z-50'>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline">
                  Sign In
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center justify-center space-x-2">
                <Link href="/message">
                  {user && <Messages userClerkId={user.id}/>}
                </Link>
                <UserButton />
              </div>
            </SignedIn>
          </div>
            {children}
          <Toaster />
        </ConvexClientProvider>
        <footer className='flex justify-center items-center bg-gray-100 p-4'>
          <p className="text-center text-sm text-gray-500">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}


function NavBar() {
  const navItems = [
    {
      name: "About",
      link: "/",
      // icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Offers",
      link: "/",
      // icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />

    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

'use client'
import s from './Navbar.module.css';
import Navlinks from './Navlinks';
import Link from 'next/link';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../sheet';
import { Button } from '../button';
import { Input } from '../input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../dropdown-menu';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import { usePathname, useRouter } from 'next/navigation';
import { handleRequest } from '@/utils/auth-helpers/client';
import { SignOut } from '@/utils/auth-helpers/server';
import { createClient } from '@/utils/supabase/client';

export default function Navbar() {
  const pathname = usePathname(); 
  const supabase = createClient();
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  if(pathname.startsWith('/u/') || pathname.startsWith('/login')) {
    return null;
  }

  // const {
  //   data: { user }
  // } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/dashboard"
          className={pathname.startsWith('/dashboard') ? "text-foreground transition-colors hover:text-foreground" : "text-muted-foreground transition-colors hover:text-foreground"}
        >
          Dashboard
        </Link>
        <Link
          href="/settings"
          className={pathname.startsWith('/settings/personal') ? "text-foreground transition-colors hover:text-foreground" : "text-muted-foreground transition-colors hover:text-foreground"}
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="#" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={"/account"}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Support</DropdownMenuItem>

            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    // <nav className="sticky top-0 bg-white z-40 transition-all duration-150 h-16 md:h-16">
    //   <a href="#skip" className="sr-only focus:not-sr-only">
    //     Skip to content
    //   </a>
    //   <div className="max-w-6xl px-6 mx-auto">
    //     <Navlinks user={user} />
    //   </div>
    // </nav>
  );
}

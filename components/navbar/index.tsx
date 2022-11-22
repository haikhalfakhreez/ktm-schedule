import * as React from 'react'
import Link from 'next/link'
import SectionLayout from '../SectionLayout'
import MobileNavigation from './MobileNavigation'
import SelectTable from './SelectTable'
import { twMerge } from 'tailwind-merge'

type RouteList = {
  name: string
  href: string
}

export const routeLists: RouteList[] = [
  {
    name: 'Route view',
    href: '/route',
  },
  {
    name: 'Table view',
    href: '/table',
  },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-opacity-80 border-b border-slate-900/10 bg-white text-sm shadow-sm">
      <SectionLayout className="py-3 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-base md:text-lg text-primary font-bold">KTM Schedule</h1>
        </Link>

        <div className="space-x-6 flex items-center">
          <NavLists className="hidden md:block" />
          <SelectTable />
        </div>
      </SectionLayout>

      {/* Mobile navigation */}
      <MobileNavigation />
    </header>
  )
}

/**
 * Mobile breadcrumbs
 */

export function NavLists({ className }: JSX.IntrinsicElements['nav']) {
  return (
    <nav className={className}>
      <ul className="flex items-center space-x-6">
        <NavList href="/route">Route View</NavList>
        <NavList href="/table">Table View</NavList>
      </ul>
    </nav>
  )
}

type NavListProps = {
  children: React.ReactNode
  href: string
  className?: string
}

export function NavList({ children, href, className }: NavListProps) {
  return (
    <li>
      <Link href={href} className={twMerge('font-semibold hover:text-highlight', className)}>
        {children}
      </Link>
    </li>
  )
}

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MobileNav } from '@/components/mobile-nav'
import { SelectTable } from '@/components/select-table'
import { SectionLayout } from '@/components/section-layout'
import { DesktopNav } from '@/components/desktop-nav'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-opacity-80 border-b border-slate-900/10 bg-white text-sm shadow-sm">
      <SectionLayout className="py-3 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-base md:text-lg text-primary font-bold">KTM Timetable</h1>
        </Link>
        <div className="space-x-6 flex items-center">
          <DesktopNav className="hidden md:block" />
          <SelectTable />
        </div>
      </SectionLayout>

      <MobileNav />
    </header>
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
      <Link href={href} className={cn('font-semibold hover:text-highlight', className)}>
        {children}
      </Link>
    </li>
  )
}

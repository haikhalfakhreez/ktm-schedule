'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Popover } from '@headlessui/react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { NavList } from '@/components/navbar'
import { SectionLayout } from '@/components/section-layout'

export function MobileNav() {
  const pathname = usePathname()

  return pathname !== '/' ? (
    <SectionLayout className="md:hidden">
      <div className="py-3 border-t md:border-t-0 border-slate-100 w-full">
        <MobileBreadcrumbs />
      </div>
    </SectionLayout>
  ) : null
}

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

function MobileBreadcrumbs() {
  const pathname = usePathname()

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <NavList href="/">
          <HomeIcon className="text-tertiary shrink-0 h-5 w-5 p-0.5" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </NavList>

        <Popover as="li" className="relative flex items-center">
          <Popover.Button>
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-tertiary" aria-hidden="true" />
          </Popover.Button>

          <Popover.Panel
            as="nav"
            className="absolute z-10 mt-3 top-full grid bg-white rounded-md ring-1 ring-slate-200 ring-opacity-70 shadow-sm"
          >
            {({ close }) => (
              <ul>
                {routeLists.map((route, index) => (
                  <li key={index}>
                    <Link
                      href={route.href}
                      className={cn(
                        'py-2.5 pl-3.5 pr-6 whitespace-nowrap block text-xs font-medium hover:bg-slate-100',
                        pathname === route.href ? 'text-slate-300 pointer-events-none' : ''
                      )}
                      onClick={() => close()}
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Popover.Panel>
        </Popover>

        {routeLists.map((route, index) =>
          pathname === route.href ? (
            <li key={index} className="font-semibold">
              {route.name}
            </li>
          ) : null
        )}
      </ol>
    </nav>
  )
}

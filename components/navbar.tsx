import * as React from 'react'
import Link from 'next/link'
import SectionLayout from './section-layout'
import { useTableContext, tableOptions } from 'context/table'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { Popover } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

type RouteList = {
  name: string
  href: string
}

const routeLists: RouteList[] = [
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
  const pathname = useRouter().pathname

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-opacity-80 border-b border-slate-900/10 bg-white text-sm shadow-sm">
      <SectionLayout className="py-3 flex justify-between items-center">
        <Link href="/">
          <a>
            <h1 className="text-base md:text-lg text-primary font-bold">KTM Schedule</h1>
          </a>
        </Link>
        <div className="space-x-6 flex items-center">
          <NavLists className="hidden md:block" />
          <SelectTable />
        </div>
      </SectionLayout>

      {/* Mobile navigation */}
      {pathname !== '/' ? (
        <SectionLayout>
          <div className="py-3 border-t md:border-t-0 border-slate-100 w-full">
            <MobileBreadcrumbs />
          </div>
        </SectionLayout>
      ) : null}
    </header>
  )
}

/**
 * Mobile breadcrumbs
 */
function MobileBreadcrumbs() {
  const pathname = useRouter().pathname

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

          <Popover.Panel as="nav" className="absolute z-10 mt-3 top-full grid bg-white rounded-md ring-1 ring-slate-200 ring-opacity-70 shadow-sm">
            {({ close }) => (
              <ul>
                {routeLists.map((route, index) => (
                  <li key={index}>
                    <Link href={route.href}>
                      <a
                        className={twMerge(
                          'py-2.5 pl-3.5 pr-6 whitespace-nowrap block text-xs font-medium hover:bg-slate-100',
                          pathname === route.href ? 'text-slate-300 pointer-events-none' : ''
                        )}
                        onClick={() => close()}
                      >
                        {route.name}
                      </a>
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

function NavLists({ className }: JSX.IntrinsicElements['nav']) {
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

function NavList({ children, href, className }: NavListProps) {
  return (
    <li>
      <Link href={href}>
        <a className={twMerge('font-semibold hover:text-highlight', className)}>{children}</a>
      </Link>
    </li>
  )
}

function SelectTable() {
  const { table, setTable } = useTableContext()

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement
    const newTable = tableOptions.find((table) => table.value === target.value)
    if (newTable) {
      setTable(newTable)
    }
  }

  return (
    <div>
      <select
        id="table"
        name="table"
        className="block w-full pl-2 md:pl-3 pr-8 md:pr-10 py-2 text-xs md:text-sm border-gray-300 focus:outline-none focus:ring-highlight focus:border-highlight rounded-md"
        value={table.value ?? 'batu-caves'}
        onChange={handleChange}
      >
        {tableOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

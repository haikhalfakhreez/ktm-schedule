import * as React from 'react'
import Link from 'next/link'
import SectionLayout from './section-layout'
import { useTableContext, tableOptions } from 'context/table'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-opacity-80 border-b border-slate-900/10 bg-white text-sm shadow-sm">
      <SectionLayout className="py-3 flex justify-between items-center">
        <Link href="/">
          <a>
            <h1 className="text-base md:text-lg text-primary font-bold">KTM Schedule</h1>
          </a>
        </Link>
        <div className="space-x-6 flex items-center">
          <NavLists />
          <SelectTable />
        </div>
      </SectionLayout>
    </header>
  )
}

function NavLists() {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center space-x-6">
        <NavList href="/route">Route View</NavList>
        <NavList href="/table">Table View</NavList>
      </ul>
    </nav>
  )
}

function NavList({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <li>
      <Link href={href}>
        <a className="font-semibold hover:text-highlight">{children}</a>
      </Link>
    </li>
  )
}

function SelectTable() {
  const [table, setTable] = useTableContext()

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

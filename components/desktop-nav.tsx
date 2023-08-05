'use client'

import { useSearchParams } from 'next/navigation'
import { NavList } from '@/components/navbar'

export function DesktopNav({ className }: JSX.IntrinsicElements['nav']) {
  const searchParams = useSearchParams()

  return (
    <nav className={className}>
      <ul className="flex items-center space-x-6">
        <NavList href={`/route?${searchParams.toString()}`}>Route View</NavList>
        <NavList href={`/table?${searchParams.toString()}`}>Table View</NavList>
      </ul>
    </nav>
  )
}

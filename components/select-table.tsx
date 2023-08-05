'use client'

import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { defaultTableOption, tableOptions } from '@/lib/table'

export function SelectTable() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const table = searchParams.get('table')

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('table', event.target.value)
      router.push(pathname + `?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  return (
    <div>
      <select
        id="table"
        name="table"
        className="block w-full pl-2 md:pl-3 pr-8 md:pr-10 py-2 text-xs md:text-sm border-slate-300 focus:outline-none focus:ring-highlight focus:border-highlight rounded-md"
        value={table ?? defaultTableOption.value}
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

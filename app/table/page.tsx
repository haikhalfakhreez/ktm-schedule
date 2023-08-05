'use client'

import { clsx } from 'clsx'
import type { WeekType } from '@/types'
import { Table } from '@/components/table'
import { LastUpdated } from '@/components/last-updated'
import { useSearchParams } from 'next/navigation'
import { defaultTableOption, tableOptions } from '@/lib/table'

export default function TablePage() {
  const searchParams = useSearchParams()
  const table =
    tableOptions.find((i) => i.value === searchParams.get('table')) || defaultTableOption

  return (
    <>
      <div>
        <p className="text-xs text-tertiary">Train to</p>
        <h2 className="text-3xl font-bold text-primary flex items-center space-x-3">
          <span>{table.name}</span>
          <WeekTypeComponent type={table.weekType} />
        </h2>
      </div>

      <LastUpdated>{table.lastUpdated}</LastUpdated>

      <div className="mt-6">
        <Table table={table} />
      </div>
    </>
  )
}

function WeekTypeComponent({ type }: { type: WeekType }) {
  const bgColorClass = type === 'weekday' ? 'bg-emerald-700' : 'bg-fuchsia-700'
  return (
    <div
      className={clsx(
        'rounded-md py-1.5 px-3 font-semibold shadow-sm text-xs text-white',
        bgColorClass
      )}
    >
      {capitalizeFirstLetter(type)}
    </div>
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

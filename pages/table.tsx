import { clsx } from 'clsx'
import { useTableContext } from 'context/table'
import type { WeekType } from 'types'
import Table from 'components/table'
import LastUpdated from 'components/last-updated'

export default function TableIndex() {
  const { table, selectedTable } = useTableContext()

  return (
    <>
      <div>
        <p className="text-xs text-tertiary">Train to</p>
        <h2 className="text-3xl font-bold text-primary flex items-center space-x-3">
          <span>{table.name}</span>
          <WeekType type={table.weekType} />
        </h2>
      </div>

      <LastUpdated>{table.lastUpdated}</LastUpdated>

      <div className="mt-6">
        <Table jsonData={selectedTable} />
      </div>
    </>
  )
}

function WeekType({ type }: { type: WeekType }) {
  const bgColorClass = type === 'weekday' ? 'bg-emerald-700' : 'bg-fuchsia-700'
  return <div className={clsx('rounded-md py-1.5 px-3 font-semibold shadow-sm text-xs text-white', bgColorClass)}>{capitalizeFirstLetter(type)}</div>
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

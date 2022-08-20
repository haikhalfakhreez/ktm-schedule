import Table from 'components/table'
import { clsx } from 'clsx'
import { useTableContext } from 'context/table'
import type { JsonData, TableDataKey, WeekType } from 'types'

import batuCavesWdData from 'lib/batu-caves-wd.json'
import batuCavesWkData from 'lib/batu-caves-wk.json'
import pulauSebangWdData from 'lib/pulau-sebang-wd.json'
import pulauSebangWkData from 'lib/pulau-sebang-wk.json'
import klangWdData from 'lib/klang-wd.json'
import klangWkData from 'lib/klang-wk.json'
import tgMalimWdData from 'lib/tg-malim-wd.json'
import tgMalimWkData from 'lib/tg-malim-wk.json'

type TableData = {
  [key in TableDataKey]: JsonData
}

const TABLE_DATA: TableData = {
  'bc-wd': batuCavesWdData as JsonData,
  'bc-wk': batuCavesWkData as JsonData,
  'ps-wd': pulauSebangWdData as JsonData,
  'ps-wk': pulauSebangWkData as JsonData,
  'kl-wd': klangWdData as JsonData,
  'kl-wk': klangWkData as JsonData,
  'tm-wd': tgMalimWdData as JsonData,
  'tm-wk': tgMalimWkData as JsonData,
}

function getWeekType(str: string): WeekType {
  return str.split('-')[1] === 'wd' ? 'weekday' : 'weekend'
}

export default function TableIndex() {
  const [table, setTable] = useTableContext()
  const selectedData: JsonData = TABLE_DATA[table.value as TableDataKey]

  return (
    <>
      <div>
        <p className="text-xs text-tertiary">Train to</p>
        <h2 className="text-3xl font-bold text-primary flex items-center space-x-3">
          <span>{table.name}</span>
          <WeekType type={getWeekType(table.value)} />
        </h2>
      </div>

      <p className="my-4 text-xs text-tertiary">
        Last updated: <span className="font-semibold text-primary">{table.lastUpdated}</span>
      </p>

      <div className="mt-6">
        <Table jsonData={selectedData} />
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

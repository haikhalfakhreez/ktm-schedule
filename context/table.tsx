import * as React from 'react'
import type { TableDataKey, JsonData } from 'types'

import batuCavesWdData from 'lib/batu-caves-wd.json'
import batuCavesWkData from 'lib/batu-caves-wk.json'
import pulauSebangWdData from 'lib/pulau-sebang-wd.json'
import pulauSebangWkData from 'lib/pulau-sebang-wk.json'
import klangWdData from 'lib/klang-wd.json'
import klangWkData from 'lib/klang-wk.json'
import tgMalimWdData from 'lib/tg-malim-wd.json'
import tgMalimWkData from 'lib/tg-malim-wk.json'

export type TableOption = {
  destination: 'A' | 'B'
  weekType: 'weekday' | 'weekend'
  value: TableDataKey
  label: string
  name: string
  lastUpdated: string
}

const weekdayIcon: string = '(Weekday)'
const weekendIcon: string = '(Weekend)'

const bc_psWeekdayLastUpdated: string = '25 July 2022'
const bc_psWeekendLastUpdated: string = '30 July 2022'
const kl_tmWeekdayLastUpdated: string = '15 June 2022'
const kl_tmWeekendLastUpdated: string = '18 June 2022'

export const tableOptions: TableOption[] = [
  {
    destination: 'A',
    weekType: 'weekday',
    value: 'bc-wd',
    label: `Batu Caves ${weekdayIcon}`,
    name: `Batu Caves`,
    lastUpdated: bc_psWeekdayLastUpdated,
  },
  {
    destination: 'A',
    weekType: 'weekend',
    value: 'bc-wk',
    label: `Batu Caves ${weekendIcon}`,
    name: `Batu Caves`,
    lastUpdated: bc_psWeekendLastUpdated,
  },
  {
    destination: 'A',
    weekType: 'weekday',
    value: 'ps-wd',
    label: `Pulau Sebang ${weekdayIcon}`,
    name: `Pulau Sebang`,
    lastUpdated: bc_psWeekdayLastUpdated,
  },
  {
    destination: 'A',
    weekType: 'weekend',
    value: 'ps-wk',
    label: `Pulau Sebang ${weekendIcon}`,
    name: `Pulau Sebang`,
    lastUpdated: bc_psWeekendLastUpdated,
  },
  {
    destination: 'B',
    weekType: 'weekday',
    value: 'kl-wd',
    label: `Klang ${weekdayIcon}`,
    name: `Klang`,
    lastUpdated: kl_tmWeekdayLastUpdated,
  },
  {
    destination: 'B',
    weekType: 'weekend',
    value: 'kl-wk',
    label: `Klang ${weekendIcon}`,
    name: `Klang`,
    lastUpdated: kl_tmWeekendLastUpdated,
  },
  {
    destination: 'B',
    weekType: 'weekday',
    value: 'tm-wd',
    label: `Tg Malim ${weekdayIcon}`,
    name: `Tg Malim`,
    lastUpdated: kl_tmWeekdayLastUpdated,
  },
  {
    destination: 'B',
    weekType: 'weekend',
    value: 'tm-wk',
    label: `Tg Malim ${weekendIcon}`,
    name: `Tg Malim`,
    lastUpdated: kl_tmWeekendLastUpdated,
  },
]

/**
 * Get route JSON data based on selected table.value
 */
type TableData = {
  [key in TableDataKey]: JsonData
}

export const TABLE_DATA: TableData = {
  'bc-wd': batuCavesWdData as JsonData,
  'bc-wk': batuCavesWkData as JsonData,
  'ps-wd': pulauSebangWdData as JsonData,
  'ps-wk': pulauSebangWkData as JsonData,
  'kl-wd': klangWdData as JsonData,
  'kl-wk': klangWkData as JsonData,
  'tm-wd': tgMalimWdData as JsonData,
  'tm-wk': tgMalimWkData as JsonData,
}

/**
 * Create React context for table
 * Default value: batu-caves (weekday)
 */
type TableContextType = {
  table: TableOption
  setTable: (newValue: TableOption) => void
  selectedTable: JsonData
}

const Context = React.createContext<TableContextType>({
  table: tableOptions[0],
  setTable: () => undefined,
  selectedTable: TABLE_DATA['bc-wd' as TableDataKey],
})

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [table, setTable] = React.useState<TableOption>(tableOptions[0])
  const selectedTable: JsonData = TABLE_DATA[table.value as TableDataKey]

  return <Context.Provider value={{ table, setTable, selectedTable }}>{children}</Context.Provider>
}

export function useTableContext() {
  return React.useContext(Context)
}

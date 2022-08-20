import * as React from 'react'
import type { TableDataKey } from 'types'

export type TableOption = {
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
    value: 'bc-wd',
    label: `Batu Caves ${weekdayIcon}`,
    name: `Batu Caves`,
    lastUpdated: bc_psWeekdayLastUpdated,
  },
  {
    value: 'bc-wk',
    label: `Batu Caves ${weekendIcon}`,
    name: `Batu Caves`,
    lastUpdated: bc_psWeekendLastUpdated,
  },
  {
    value: 'ps-wd',
    label: `Pulau Sebang ${weekdayIcon}`,
    name: `Pulau Sebang`,
    lastUpdated: bc_psWeekdayLastUpdated,
  },
  {
    value: 'ps-wk',
    label: `Pulau Sebang ${weekendIcon}`,
    name: `Pulau Sebang`,
    lastUpdated: bc_psWeekendLastUpdated,
  },
  {
    value: 'kl-wd',
    label: `Klang ${weekdayIcon}`,
    name: `Klang`,
    lastUpdated: kl_tmWeekdayLastUpdated,
  },
  {
    value: 'kl-wk',
    label: `Klang ${weekendIcon}`,
    name: `Klang`,
    lastUpdated: kl_tmWeekendLastUpdated,
  },
  {
    value: 'tm-wd',
    label: `Tg Malim ${weekdayIcon}`,
    name: `Tg Malim`,
    lastUpdated: kl_tmWeekdayLastUpdated,
  },
  {
    value: 'tm-wk',
    label: `Tg Malim ${weekendIcon}`,
    name: `Tg Malim`,
    lastUpdated: kl_tmWeekendLastUpdated,
  },
]

// Default value: batu-caves
const Context = React.createContext<[table: TableOption, setTable: (newValue: TableOption) => void]>([tableOptions[0], () => undefined])

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [table, setTable] = React.useState<TableOption>(tableOptions[0])
  return <Context.Provider value={[table, setTable]}>{children}</Context.Provider>
}

export function useTableContext() {
  return React.useContext(Context)
}

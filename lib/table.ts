import type { TableDataKey, JsonData } from '@/types'

import batuCavesWdData from '@/data/batu-caves-wd.json'
import batuCavesWkData from '@/data/batu-caves-wk.json'
import pulauSebangWdData from '@/data/pulau-sebang-wd.json'
import pulauSebangWkData from '@/data/pulau-sebang-wk.json'
import klangWdData from '@/data/klang-wd.json'
import klangWkData from '@/data/klang-wk.json'
import tgMalimWdData from '@/data/tg-malim-wd.json'
import tgMalimWkData from '@/data/tg-malim-wk.json'

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

const bc_psWeekdayLastUpdated: string = '10 July 2023'
const bc_psWeekendLastUpdated: string = '8 July 2023'
const kl_tmWeekdayLastUpdated: string = '12 July 2023'
const kl_tmWeekendLastUpdated: string = '8 July 2023'

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

export const defaultTableOption = tableOptions[0]

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

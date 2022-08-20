import { DestinationsName } from 'types'

export * from './destination'

export type JsonData = {
  train: {
    [key: string]: DestinationsName
  }
  data: {
    [key: string]: {
      [key: string]: string | null
    }
  }
}

export type WeekType = 'weekday' | 'weekend'
export type TableDataKey = 'bc-wd' | 'bc-wk' | 'ps-wd' | 'ps-wk' | 'kl-wd' | 'kl-wk' | 'tm-wd' | 'tm-wk'

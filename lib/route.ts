import batuCavesWdJson from 'lib/batu-caves-wd.json'
import klangWdJson from 'lib/klang-wd.json'
import { JsonData, DestinationsKey, DestinationsName } from 'types'

/**
 * List of shortcuts used for destinations
 * Destination A: Batu Caves - Pulau Sebang
 * Destination B: Tg Malim - Klang
 * 
 * bc: Batu Caves
 * ps: Pulau Sebang
 * kl: Klang
 * tm: Tg Malim
 */

export const destinationsA: DestinationsName[] = Object.values(batuCavesWdJson.train as JsonData['train'])
export const destinationsB: DestinationsName[] = Object.values(klangWdJson.train as JsonData['train'])

/**
 * Get the time of a destination from all instances of train throughout the day
 */
export function getDestinationTime(destination: DestinationsName | null, destinationData: JsonData): (string | null)[] {
  const destinationKeyValue = Object.entries(destinationData.train).find(([key, value]) => value === destination) as [DestinationsKey, DestinationsName]
  const index: DestinationsKey = destinationKeyValue[0]
  const time = Object.values(destinationData.data).map(item => item[index]) as (string | null)[]

  return time
}

/**
 * Get the name of a destination that is based on destinationsA or destinationsB, with correct casing.
 */
export function getDestinationName(destination: string): DestinationsName {
  const combinedDestinations = [...destinationsA, ...destinationsB] as DestinationsName[]
  return combinedDestinations.find(item => item.toLowerCase() === destination.toLowerCase()) as DestinationsName
}

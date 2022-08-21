import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { destinationsA, destinationsB, getDestinationTime } from 'lib/route'
import type { JsonData, DestinationsName, WeekType } from 'types'
import { addZeroToHour } from 'lib/utils'
import { useTableContext } from 'context/table'
import LastUpdated from 'components/last-updated'

import batuCavesWdData from 'lib/batu-caves-wd.json'
import batuCavesWkData from 'lib/batu-caves-wk.json'
import pulauSebangWdData from 'lib/pulau-sebang-wd.json'
import pulauSebangWkData from 'lib/pulau-sebang-wk.json'
import klangWdData from 'lib/klang-wd.json'
import klangWkData from 'lib/klang-wk.json'
import tgMalimWdData from 'lib/tg-malim-wd.json'
import tgMalimWkData from 'lib/tg-malim-wk.json'

type TimeFromTo = (string | null)[] | null

export default function TableIndex() {
  const [from, setFrom] = React.useState<DestinationsName | ''>('')
  const [to, setTo] = React.useState<DestinationsName | ''>('')
  const [timeFrom, setTimeFrom] = React.useState<TimeFromTo>(null)
  const [timeTo, setTimeTo] = React.useState<TimeFromTo>(null)

  const [destination, setDestination] = React.useState<'A' | 'B'>('A')
  const [selectedDestination, setSelectedDestination] = React.useState<string[] | []>([])
  const [route, setRoute] = React.useState<JsonData | null>(null)
  const [week, setWeek] = React.useState<WeekType>('weekday')

  /**
   * Get the index of train station based on a route.
   *
   * IMPORTANT TO NOTE:
   * destinationA is based on route towards Batu Caves, destinationB is based on route towards Klang.
   * So, if fromIndex is less (<) than toIndex, it means the train is going towards destination A (Batu Caves) or B (Klang).
   */
  const [fromIndex, setFromIndex] = React.useState<number | null>(null)
  const [toIndex, setToIndex] = React.useState<number | null>(null)
  const [sortedOptions, setSortedOptions] = React.useState<string[] | []>([])

  React.useEffect(() => {
    setSelectedDestination(destination === 'A' ? destinationsA : destinationsB)
    setSortedOptions([...selectedDestination].sort((a, b) => a.localeCompare(b)))

    reset()
  }, [destination, selectedDestination])

  React.useEffect(() => {
    setFromIndex(selectedDestination.findIndex((item) => item === from))
    setToIndex(selectedDestination.findIndex((item) => item === to))
  }, [to, from, selectedDestination])

  React.useEffect(() => {
    if (fromIndex != null && toIndex != null) {
      const batuCavesData = week === 'weekday' ? batuCavesWdData : batuCavesWkData
      const pulauSebangData = week === 'weekday' ? pulauSebangWdData : pulauSebangWkData
      const klangData = week === 'weekday' ? klangWdData : klangWkData
      const tgMalimData = week === 'weekday' ? tgMalimWdData : tgMalimWkData

      // Select the route based on the from and to
      if (fromIndex > toIndex) {
        setRoute(destination === 'A' ? (pulauSebangData as JsonData) : (tgMalimData as JsonData))
      } else {
        setRoute(destination === 'A' ? (batuCavesData as JsonData) : (klangData as JsonData))
      }
    }
  }, [fromIndex, toIndex, destination, week])

  React.useEffect(() => {
    if (from && to && route) {
      setTimeFrom(getDestinationTime(from, route))
      setTimeTo(getDestinationTime(to, route))
    }
  }, [from, to, route])

  /**
   * Set route, weektype, and direction based on table context.
   */
  const { table } = useTableContext()

  React.useEffect(() => {
    setDestination(table.destination)
    setWeek(table.weekType)
  }, [table])

  function reset() {
    setFrom('')
    setTo('')
    setTimeFrom(null)
    setTimeTo(null)
  }

  return (
    <div className="max-w-screen-sm mx-auto">
      <h2 className="text-3xl font-bold text-primary">Route</h2>

      <div className="space-y-6 mt-4">
        {/* Select route */}
        <section>
          <RouteTitle>Select route 🛤️</RouteTitle>
          <div className="flex items-center space-x-4">
            <RouteButton onClick={() => setDestination('A')} active={destination === 'A'}>
              Batu Caves - Pulau Sebang
            </RouteButton>
            <RouteButton onClick={() => setDestination('B')} active={destination === 'B'}>
              Tg Malim - Klang
            </RouteButton>
          </div>
        </section>

        {/* Select weekday or weekend */}
        <section>
          <RouteTitle>Select week type 📅</RouteTitle>
          <div className="flex items-center space-x-4">
            <RouteButton className="py-2.5" onClick={() => setWeek('weekday')} active={week === 'weekday'}>
              Weekday
            </RouteButton>
            <RouteButton className="py-2.5" onClick={() => setWeek('weekend')} active={week === 'weekend'}>
              Weekend
            </RouteButton>
          </div>
        </section>

        {/* Select destination */}
        <section>
          <RouteTitle>Choose destination 🎯</RouteTitle>
          <div className="flex flex-col">
            <DestinationInput
              name="from"
              placeholder="From"
              options={sortedOptions}
              value={from}
              disabledOption={to}
              onChange={(e) => setFrom(e.target.value as DestinationsName)}
            />

            <div className="my-2 text-xs text-tertiary text-center">towards ⬇️</div>

            <DestinationInput
              name="to"
              placeholder="To"
              options={sortedOptions}
              value={to}
              disabledOption={from}
              onChange={(e) => setTo(e.target.value as DestinationsName)}
            />
          </div>
        </section>

        {/* Show route data */}
        <section>
          <RouteTitle>Route data 📊</RouteTitle>

          {timeFrom && timeTo ? (
            <>
              {/* Last updated */}
              <LastUpdated>{table.lastUpdated}</LastUpdated>

              {/* Data table */}
              <div className="shadow ring-1 ring-gray-200 rounded max-h-[500px] overflow-y-auto scrollbar-hide">
                <table className="border-separate table-fixed w-full text-center table-departure-arrival" style={{ borderSpacing: 0 }}>
                  <thead>
                    <tr className="divide-x divide-gray-200">
                      <th scope="col" className="bg-gray-50 sticky top-0 border-b border-gray-200 px-3 py-3 text-sm font-semibold text-gray-900">
                        Departure
                      </th>
                      <th scope="col" className="bg-gray-50 sticky top-0 border-b border-gray-200 px-3 py-3 text-sm font-semibold text-gray-900">
                        Arrival
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeFrom.map((_, index) =>
                      timeFrom[index] && timeTo[index] ? (
                        <tr key={index} className="divide-x divide-gray-200">
                          <td className="bg-white border-b border-gray-200 whitespace-nowrap px-3 py-2.5 text-sm text-gray-500">
                            {addZeroToHour(timeFrom[index] as string)}
                          </td>
                          <td className="bg-white border-b border-gray-200 whitespace-nowrap px-3 py-2.5 text-sm text-gray-500">
                            {addZeroToHour(timeTo[index] as string)}
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="py-20 text-center space-y-1">
              <div className="font-semibold">No data 🤷</div>
              <p className="text-tertiary text-sm">
                Please select your <span className="text-secondary font-medium">From</span> and <span className="text-secondary font-medium">To</span>{' '}
                destinations
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

type RouteTitleProps = {
  children: React.ReactNode
}

function RouteTitle({ children, ...titleProps }: RouteTitleProps & JSX.IntrinsicElements['h3']) {
  return (
    <h3 className="text-sm font-semibold text-tertiary mb-2" {...titleProps}>
      {children}
    </h3>
  )
}

/**
 * Select Train Route
 */
type RouteButtonProps = {
  children: React.ReactNode
  active?: boolean
  className?: string
}

function RouteButton({ children, className, active, ...buttonProps }: RouteButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button
      className={twMerge(
        'flex-1 rounded-md border font-semibold text-sm text-secondary px-8 py-4 focus:ring-2  focus:ring-opacity-70',
        active
          ? 'bg-indigo-50 hover:bg-indigo-100 border-highlight focus:ring-indigo-200'
          : 'bg-white hover:bg-slate-100 border-slate-200 focus:ring-slate-200',
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

/**
 * Select Destination
 */
type DestinationInputProps = {
  name: string
  placeholder: string
  disabledOption: DestinationsName | ''
  options: string[]
}

function DestinationInput({ name, placeholder, options, disabledOption, ...selectProps }: DestinationInputProps & JSX.IntrinsicElements['select']) {
  return (
    <select
      name={name}
      id={name}
      className="flex-1 shadow-sm focus:ring-highlight focus:border-highlight block w-full text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 focus:outline-none"
      placeholder={placeholder}
      {...selectProps}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((item) => (
        <option key={item} value={item} disabled={disabledOption === item}>
          {item}
        </option>
      ))}
    </select>
  )
}

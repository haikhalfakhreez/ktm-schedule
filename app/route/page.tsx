'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import type { JsonData, DestinationsName, WeekType } from '@/types'
import { addZeroToHour, cn } from '@/lib/utils'
import { defaultTableOption, tableOptions } from '@/lib/table'
import { destinationsA, destinationsB, getDestinationTime } from '@/lib/route'
import { LastUpdated } from '@/components/last-updated'

import batuCavesWdData from '@/data/batu-caves-wd.json'
import batuCavesWkData from '@/data/batu-caves-wk.json'
import pulauSebangWdData from '@/data/pulau-sebang-wd.json'
import pulauSebangWkData from '@/data/pulau-sebang-wk.json'
import klangWdData from '@/data/klang-wd.json'
import klangWkData from '@/data/klang-wk.json'
import tgMalimWdData from '@/data/tg-malim-wd.json'
import tgMalimWkData from '@/data/tg-malim-wk.json'
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'

type TimeFromTo = (string | null)[] | null

export default function RoutePage() {
  const searchParams = useSearchParams()
  const table =
    tableOptions.find((i) => i.value === searchParams.get('table')) || defaultTableOption

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

  /**
   * Remove highlight on table everytime component re-renders.
   */
  const rowsRef = React.useRef<Array<HTMLDivElement | null>>([])

  function removeHighlight() {
    rowsRef.current.forEach((row) => {
      if (row) row.className = 'divide-x divide-slate-200'
    })
  }

  React.useEffect(() => {
    if (timeFrom && timeTo) {
      rowsRef.current = rowsRef.current.slice(0, timeFrom.length)
      removeHighlight()
    }
  }, [timeFrom, timeTo])

  const switchDestination = React.useCallback(() => {
    setFrom(to)
    setTo(from)
  }, [from, to])

  return (
    <>
      <div className="max-w-screen-sm mx-auto">
        <h2 className="text-3xl font-bold text-primary">Route</h2>

        <div className="space-y-6 mt-4">
          {/* Select route */}
          <section>
            <RouteTitle>Select route 🛤️</RouteTitle>
            <div className="flex items-stretch space-x-4">
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
            <div className="flex items-stretch space-x-4">
              <RouteButton onClick={() => setWeek('weekday')} active={week === 'weekday'}>
                Weekday
              </RouteButton>
              <RouteButton onClick={() => setWeek('weekend')} active={week === 'weekend'}>
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

              <div className="flex items-center justify-center space-x-4 py-3">
                <div className="my-2 text-xs text-tertiary text-center">towards ⬇️</div>
                <SwitchButton onClick={switchDestination} disabled={!from || !to} />
              </div>

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
                <div className="shadow ring-1 ring-slate-200 rounded overflow-hidden">
                  <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
                    <table
                      className="border-separate table-fixed w-full text-center table-departure-arrival"
                      style={{ borderSpacing: 0 }}
                    >
                      <thead>
                        <tr className="divide-x divide-slate-200">
                          <th
                            scope="col"
                            className="bg-slate-50 sticky top-0 border-b border-slate-200 px-3 py-3 text-sm font-semibold text-primary"
                          >
                            Departure
                          </th>
                          <th
                            scope="col"
                            className="bg-slate-50 sticky top-0 border-b border-slate-200 px-3 py-3 text-sm font-semibold text-primary"
                          >
                            Arrival
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {timeFrom.map((_, index) =>
                          timeFrom[index] && timeTo[index] ? (
                            <tr
                              key={index}
                              className="divide-x divide-slate-200"
                              onClick={highlightRow}
                              ref={(el) => (rowsRef.current[index] = el)}
                            >
                              <td className="bg-white border-b border-slate-200 whitespace-nowrap px-3 py-2.5 text-sm text-slate-500">
                                {addZeroToHour(timeFrom[index] as string)}
                              </td>
                              <td className="bg-white border-b border-slate-200 whitespace-nowrap px-3 py-2.5 text-sm text-slate-500">
                                {addZeroToHour(timeTo[index] as string)}
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="pb-20 pt-28 text-center space-y-1">
                <div className="font-semibold">No data 🤷🏻‍♀️</div>
                <p className="text-tertiary text-sm">
                  Please select your <span className="text-secondary font-medium">From</span> and{' '}
                  <span className="text-secondary font-medium">To</span> destinations
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

function highlightRow(e: React.MouseEvent<HTMLTableRowElement>) {
  const target = e.currentTarget as HTMLTableRowElement
  target.classList.toggle('route-highlight-row')
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

function RouteButton({
  children,
  className,
  active,
  ...buttonProps
}: RouteButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button
      className={cn(
        'flex-1 rounded-md border font-semibold text-sm text-secondary px-8 py-4 focus:ring-2',
        active
          ? 'bg-indigo-50 hover:bg-indigo-100 border-highlight focus:ring-highlight/50'
          : 'bg-white hover:bg-slate-100 border-slate-200 focus:ring-slate-200/70',
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

function DestinationInput({
  name,
  placeholder,
  options,
  disabledOption,
  ...selectProps
}: DestinationInputProps & JSX.IntrinsicElements['select']) {
  return (
    <select
      name={name}
      id={name}
      className="flex-1 shadow-sm focus:ring-2 focus:ring-highlight/50 focus:border-highlight block w-full text-sm border border-slate-200 rounded-md pl-4 pr-10 py-3 focus:outline-none"
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

function SwitchButton({ ...props }: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type="button"
      className="border border-slate-200 p-1.5 rounded-md focus:ring-2 focus:ring-highlight/50 focus:border-highlight bg-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
      title="Switch destination"
      {...props}
    >
      <ArrowsUpDownIcon className="h-3.5 w-3.5" />
      <span className="sr-only">Switch destination</span>
    </button>
  )
}

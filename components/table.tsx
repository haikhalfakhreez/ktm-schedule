import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { JsonData } from 'types'

export default function Table({ jsonData }: { jsonData: JsonData }) {
  const { train, data } = jsonData

  const trainKeysLength = Object.keys(train).length
  const dataKeysLength = Object.keys(data).length

  return (
    <div className="overflow-hidden shadow ring-1 ring-gray-200 rounded">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
          <thead>
            <tr>
              <Th sticky className="bg-gray-100 text-left">
                Train 🚄
              </Th>
              {Object.keys(data).map((item, index) => (
                <Th key={index} showBorderRight={index !== dataKeysLength - 1}>
                  {item}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(train).map((_, _index) => (
              <tr key={_index}>
                <Td sticky className="bg-gray-100 text-left" showBorderBottom={_index !== trainKeysLength - 1}>
                  {train[_index]}
                </Td>
                {Object.entries(data).map(([key, value], index) => (
                  <Td key={index} showBorderRight={index !== dataKeysLength - 1} showBorderBottom={_index !== trainKeysLength - 1}>
                    {value[_index]}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

type TableProps = {
  sticky?: boolean
  children: React.ReactNode
  showBorderRight?: boolean
  showBorderBottom?: boolean
  className?: string
}

function Td({ sticky = false, children, showBorderRight = true, showBorderBottom = true, className }: TableProps) {
  return (
    <td
      scope="col"
      className={twMerge(
        'whitespace-nowrap px-2 md:px-4 py-2 text-center text-sm text-gray-500 border-gray-200',
        sticky ? 'sticky left-0 z-10' : '',
        showBorderRight ? 'border-r' : '',
        showBorderBottom ? 'border-b' : '',
        className
      )}
    >
      {children}
    </td>
  )
}

function Th({ sticky = false, children, showBorderRight = true, showBorderBottom = true, className }: TableProps) {
  return (
    <th
      scope="col"
      className={twMerge(
        'bg-gray-50 px-2 md:px-4 py-3.5 text-center text-sm font-semibold text-gray-900 border-gray-200',
        sticky ? 'sticky left-0 z-10' : '',
        showBorderRight ? 'border-r' : '',
        showBorderBottom ? 'border-b' : '',
        className
      )}
    >
      {children}
    </th>
  )
}

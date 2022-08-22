import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { JsonData } from 'types'

export default function Table({ jsonData }: { jsonData: JsonData }) {
  const rowsRef = React.useRef<Array<HTMLDivElement | null>>([])
  const { train, data } = jsonData

  const trainKeysLength = Object.keys(train).length
  const dataKeysLength = Object.keys(data).length

  /** Remove highlight on table everytime component re-renders. */
  function removeHighlight() {
    rowsRef.current.forEach((row) => {
      if (row) row.className = ''
    })
  }

  React.useEffect(() => {
    rowsRef.current = rowsRef.current.slice(0, Object.keys(train).length)
    removeHighlight()
  }, [train])

  return (
    <div className="overflow-hidden shadow ring-1 ring-slate-200 rounded">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
          <thead>
            <tr>
              <Th sticky className="bg-slate-100 text-left">
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
              <tr key={_index} onClick={highlightRow} ref={(el) => (rowsRef.current[_index] = el)}>
                <Td sticky className="bg-slate-100 text-left" showBorderBottom={_index !== trainKeysLength - 1}>
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

function highlightRow(e: React.MouseEvent<HTMLTableRowElement>) {
  const target = e.currentTarget as HTMLTableRowElement
  target.classList.toggle('table-highlight-row')
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
        'whitespace-nowrap px-2 md:px-4 py-2 text-center text-sm text-tertiary border-slate-200',
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
        'bg-slate-50 px-2 md:px-4 py-3.5 text-center text-sm font-semibold text-primary border-slate-200',
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

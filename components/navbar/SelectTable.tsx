'use client'

import { useTableContext, tableOptions } from 'context/table'

export default function SelectTable() {
  const { table, setTable } = useTableContext()

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement
    const newTable = tableOptions.find((table) => table.value === target.value)
    if (newTable) {
      setTable(newTable)
    }
  }

  return (
    <div>
      <select
        id="table"
        name="table"
        className="block w-full pl-2 md:pl-3 pr-8 md:pr-10 py-2 text-xs md:text-sm border-slate-300 focus:outline-none focus:ring-highlight focus:border-highlight rounded-md"
        value={table.value ?? 'batu-caves'}
        onChange={handleChange}
      >
        {tableOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

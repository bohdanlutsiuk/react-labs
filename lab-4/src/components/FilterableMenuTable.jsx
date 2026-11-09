import SearchBar from './SearchBar.jsx'
import MenuTable from './MenuTable.jsx'
import { useEffect, useState } from 'react'

export default function FilterableMenuItem({ menu }) {
  const [filterText, setFilterText] = useState(
    () => localStorage.getItem('menu.filterText') ?? '',
  )
  const [inStockOnly, setInStockOnly] = useState(
    () => localStorage.getItem('menu.inStockOnly') === 'true',
  )

  useEffect(() => {
    localStorage.setItem('menu.filterText', String(filterText))
    localStorage.setItem('menu.inStockOnly', String(inStockOnly))
  }, [filterText, inStockOnly])

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <MenuTable
        menu={menu}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  )
}

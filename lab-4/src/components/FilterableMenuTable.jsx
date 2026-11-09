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

  function handleReset() {
    setFilterText('')
    setInStockOnly(false)
  }

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
        onReset={handleReset}
      />
      <MenuTable
        menu={menu}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  )
}

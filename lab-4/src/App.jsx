import CafeInfo from './components/CafeInfo.jsx'
import { menu } from './data.js'
import FilterableMenuItem from './components/FilterableMenuTable.jsx'

export default function App() {
  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>
      <FilterableMenuItem menu={menu} />
      <CafeInfo />
    </main>
  )
}

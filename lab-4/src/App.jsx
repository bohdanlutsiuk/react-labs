import CafeInfo from './components/CafeInfo.jsx'
import FilterableMenuItem from './components/FilterableMenuTable.jsx'

export default function App() {
  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>
      <FilterableMenuItem />
      <CafeInfo />
    </main>
  )
}

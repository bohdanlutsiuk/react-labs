import { createContext, useContext, useId, useRef, useState } from 'react'

/**
 * Вкладки — складений компонент (compound component): `Tabs` і його частини
 * `Tabs.List`, `Tabs.Tab` і `Tabs.Panel`. Вміст кожної частини приходить між
 * її тегами як `children`, а яка вкладка обрана, частини дізнаються з
 * контексту, який створює `Tabs`.
 *
 * Використання:
 *   <Tabs defaultValue="brew">
 *     <Tabs.List aria-label="Про каву">
 *       <Tabs.Tab value="brew">Заварювання</Tabs.Tab>
 *       <Tabs.Tab value="reviews">Відгуки</Tabs.Tab>
 *     </Tabs.List>
 *     <Tabs.Panel value="brew">…</Tabs.Panel>
 *     <Tabs.Panel value="reviews">…</Tabs.Panel>
 *   </Tabs>
 *
 * Вимоги — у тестах tests/Tabs.children.test.jsx і tests/Tabs.a11y.test.jsx.
 */
const TabsContext = createContext()

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs related components must be used in <Tabs> component')
  }
  return context
}

export default function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  const id = useId()

  const getTabId = (value) => `tab_${id}-${value}`
  const getPanelId = (value) => `panel_${id}-${value}`

  return (
    <TabsContext.Provider
      value={{ activeTab, setActiveTab, getTabId, getPanelId }}
    >
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

function List({ 'aria-label': ariaLabel, children }) {
  const { setActiveTab } = useTabsContext()
  const listRef = useRef(null)

  const handleKeyDown = (event) => {
    const tabs = Array.from(listRef.current.querySelectorAll('[role="tab"]'))
    const index = tabs.findIndex((t) => t === document.activeElement)
    if (index === -1) return

    let nextIndex
    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    } else {
      return
    }

    event.preventDefault()
    const nextTab = tabs[nextIndex]
    const nextValue = nextTab.dataset.value

    setActiveTab(nextValue)
    nextTab.focus()
  }

  return (
    <div
      className="tab-list"
      role="tablist"
      aria-label={ariaLabel}
      ref={listRef}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab, getTabId, getPanelId } = useTabsContext()
  const isActive = activeTab === value
  return (
    <button
      role="tab"
      type="button"
      id={getTabId(value)}
      aria-selected={isActive}
      aria-controls={getPanelId(value)}
      tabIndex={isActive ? 0 : -1}
      className={isActive ? 'active' : ''}
      onClick={() => setActiveTab(value)}
      data-value={value}
    >
      {children}
    </button>
  )
}

function Panel({ value, children }) {
  const { activeTab, getTabId, getPanelId } = useTabsContext()
  const isActive = activeTab === value

  return (
    <div
      hidden={!isActive}
      role="tabpanel"
      id={getPanelId(value)}
      aria-labelledby={getTabId(value)}
      tabIndex={0}
    >
      {children}
    </div>
  )
}

Tabs.List = List
Tabs.Tab = Tab
Tabs.Panel = Panel

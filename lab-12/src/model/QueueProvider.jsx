import { useState } from 'react'
import { createStore } from 'zustand/vanilla'
import { createInitialState, queueReducer } from './queueReducer.js'
import { createHistory, withUndo } from './withUndo.js'
import { loadOrders } from '../data/orders.js'
import { QueueContext, QueueDispatchContext } from './queueContext.js'

/**
 * §4.5. Провайдер черги: компонент, який зберігає стан черги в useReducer
 * з withUndo(queueReducer), як зараз App, і передає його через
 * QueueContext і QueueDispatchContext компонентам, отриманим як children.
 *
 * Поки що кидає помилку. Вимоги — у тестах tests/QueueProvider.test.jsx.
 */
const undoableQueue = withUndo(queueReducer)

export default function QueueProvider({ children }) {
  const [store] = useState(() =>
    createStore((set) => ({
      history: createHistory(createInitialState(loadOrders())),
      dispatch(action) {
        set((state) => ({ history: undoableQueue(state.history, action) }))
      },
    })),
  )

  return (
    <QueueContext value={store}>
      <QueueDispatchContext value={store.getState().dispatch}>
        {children}
      </QueueDispatchContext>
    </QueueContext>
  )
}

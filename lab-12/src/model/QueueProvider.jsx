import { createInitialState, queueReducer } from './queueReducer.js'
import { createHistory, withUndo } from './withUndo.js'
import { useReducer } from 'react'
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
  const [history, dispatch] = useReducer(undoableQueue, null, () =>
    createHistory(createInitialState(loadOrders())),
  )
  const queue = history.present

  return (
    <QueueContext
      value={{
        queue,
        canUndo: history.past.length > 0,
        canRedo: history.future.length > 0,
      }}
    >
      <QueueDispatchContext value={dispatch}>{children}</QueueDispatchContext>
    </QueueContext>
  )
}

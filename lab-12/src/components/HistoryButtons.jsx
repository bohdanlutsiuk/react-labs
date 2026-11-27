import { use, useRef } from 'react'
import { flushSync } from 'react-dom'
import { QueueDispatchContext, useQueue } from '../model/queueContext.js'

/**
 * «Скасувати дію» й «Повторити дію» для черги. Кожна кнопка вимкнена, коли
 * нема чого скасовувати чи повторювати.
 */
export default function HistoryButtons() {
  const { canUndo, canRedo } = useQueue()
  const dispatch = use(QueueDispatchContext)
  const undoRef = useRef(null)
  const redoRef = useRef(null)

  // Кнопка, яку вимкнуло її ж натискання (кроків більше нема), втрачає фокус,
  // і він падає на початок сторінки. Тому flushSync одразу оновлює сторінку,
  // а фокус переходить на другу кнопку.
  function press(action, button, other) {
    flushSync(action)
    if (button.current.disabled) other.current.focus()
  }

  return (
    <div className="history" role="group" aria-label="Історія змін">
      <button
        ref={undoRef}
        type="button"
        onClick={() =>
          press(() => dispatch({ type: 'undo' }), undoRef, redoRef)
        }
        disabled={!canUndo}
      >
        Скасувати дію
      </button>
      <button
        ref={redoRef}
        type="button"
        onClick={() =>
          press(() => dispatch({ type: 'redo' }), undoRef, redoRef)
        }
        disabled={!canRedo}
      >
        Повторити дію
      </button>
    </div>
  )
}

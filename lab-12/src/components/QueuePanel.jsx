import HistoryButtons from './HistoryButtons.jsx'
import OrderDetails from './OrderDetails.jsx'
import OrderBoard from './OrderBoard.jsx'
import { useState } from 'react'

/**
 * §4.6. Частина сторінки з чергою: кнопки історії, «Деталі замовлення» й
 * дошка, усередині <main className="queue">. Зберігає id замовлення,
 * відкритого в «Деталях», і не отримує пропсів.
 *
 * Поки що кидає помилку. Вимоги — у тестах tests/QueuePanel.test.jsx.
 */
export default function QueuePanel() {
  const [openedId, setOpenedId] = useState(null)

  return (
    <main className="queue">
      <HistoryButtons />
      <OrderDetails orderId={openedId} onClose={() => setOpenedId(null)} />
      <OrderBoard onOpen={(order) => setOpenedId(order.id)} />
    </main>
  )
}

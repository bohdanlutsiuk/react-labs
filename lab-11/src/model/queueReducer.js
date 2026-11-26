/**
 * Ред'юсер черги замовлень.
 *
 * Стан: { orders: [...] }. Кожне замовлення — як у src/data/orders.js:
 *   { id, number, status, customer: { id, name }, items: [...] }
 * status — колонка на дошці: 'new' («Нові»), 'brewing' («Готуються»),
 * 'ready' («Готові») або 'served' («Видані»).
 *
 * Дії — події на сторінці:
 *   { type: 'order_placed', order: { id, customer: { id, name }, items } }
 *       бариста надіслав нове замовлення з форми. Номер і статус 'new'
 *       дає ред'юсер, кожен напій отримує done: false. id замовлення й
 *       гостя створює обробник події.
 *   { type: 'item_toggled', orderId, itemId }
 *       бариста відмітив напій готовим або зняв позначку
 *   { type: 'order_advanced', orderId }
 *       бариста натиснув «Почати», «Готово» чи «Видати»: замовлення
 *       переходить у наступну колонку
 *   { type: 'order_cancelled', orderId }
 *       бариста натиснув «Скасувати замовлення»
 *   { type: 'customer_renamed', customerId, name }
 *       бариста виправив ім'я гостя в «Деталях»
 *
 * Компоненти й тести читають стан лише через selectColumn і selectOrder
 * унизу файлу.
 */

const nextStatus = { new: 'brewing', brewing: 'ready', ready: 'served' }

// Номер останнього замовлення. У стані його не тримаємо: номери лише
// ростуть, а номер скасованого замовлення новому не дістається.

/** Початковий стан черги з вкладених замовлень, як їх повертає loadOrders(). */
export function createInitialState(orders) {
  const parsedOrders = { byId: {}, ids: [] }
  const parsedCustomers = { byId: {}, ids: [] }

  for (const order of orders) {
    parsedOrders.ids.push(order.id)
    parsedOrders.byId[order.id] = {
      id: order.id,
      number: order.number,
      status: order.status,
      customerId: order.customer.id,
      items: order.items,
    }

    if (!parsedCustomers.byId[order.customer.id]) {
      parsedCustomers.ids.push(order.customer.id)
      parsedCustomers.byId[order.customer.id] = { ...order.customer }
    }
  }

  const lastNumber = orders.reduce(
    (largest, order) => Math.max(largest, order.number),
    0,
  )

  return {
    orders: parsedOrders,
    customers: parsedCustomers,
    lastNumber,
  }
}

export function queueReducer(state, action) {
  switch (action.type) {
    case 'order_placed': {
      const number = state.lastNumber + 1
      const customer = action.order.customer
      const order = {
        id: action.order.id,
        number,
        status: 'new',
        customerId: customer.id,
        items: action.order.items.map((item) => ({ ...item, done: false })),
      }
      return {
        ...state,
        orders: {
          ids: [...state.orders.ids, order.id],
          byId: { ...state.orders.byId, [order.id]: order },
        },
        customers:
          customer.id in state.customers.ids
            ? state.customers
            : {
                ids: [...state.customers.ids, customer.id],
                byId: { ...state.customers.byId, [customer.id]: customer },
              },
        lastNumber: number,
      }
    }
    case 'item_toggled': {
      const order = state.orders.byId[action.orderId]
      if (!order) return state
      return {
        ...state,
        orders: {
          ...state.orders,
          byId: {
            ...state.orders.byId,
            [order.id]: {
              ...order,
              items: order.items.map((item) =>
                item.id === action.itemId
                  ? { ...item, done: !item.done }
                  : item,
              ),
            },
          },
        },
      }
    }
    case 'order_advanced': {
      const order = state.orders.byId[action.orderId]
      if (!order) return state
      return {
        ...state,
        orders: {
          ...state.orders,
          byId: {
            ...state.orders.byId,
            [order.id]: {
              ...order,
              status: nextStatus[order.status],
            },
          },
        },
      }
    }
    case 'order_cancelled': {
      if (!(action.orderId in state.orders.byId)) return state
      const byId = { ...state.orders.byId }
      delete byId[action.orderId]
      return {
        ...state,
        orders: {
          byId,
          ids: state.orders.ids.filter((id) => id !== action.orderId),
        },
      }
    }
    case 'customer_renamed': {
      const customer = state.customers.byId[action.customerId]
      if (!customer) return state
      return {
        ...state,
        customers: {
          ...state.customers,
          byId: {
            ...state.customers.byId,
            [customer.id]: {
              ...customer,
              name: action.name,
            },
          },
        },
      }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

/**
 * Замовлення однієї колонки (status) у порядку надходження, кожне разом із
 * гостем і напоями.
 */
export function selectColumn(state, status) {
  return state.orders.ids
    .map((id) => selectOrder(state, id))
    .filter((order) => order.status === status)
}

/** Замовлення за id разом із гостем і напоями; undefined, якщо його немає. */
export function selectOrder(state, id) {
  const order = state.orders.byId[id]
  if (!order) {
    return undefined
  }
  return {
    ...order,
    customer: state.customers.byId[order.customerId],
  }
}

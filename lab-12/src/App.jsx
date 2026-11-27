import OrderComposer from './components/OrderComposer.jsx'
import QueueProvider from './model/QueueProvider.jsx'
import QueuePanel from './components/QueuePanel.jsx'
import StopListProvider from './model/StopListProvider.jsx'
import StopList from './components/StopList.jsx'

// Створюється один раз, під час імпорту: у кожному рендері App отримує той
// самий ред'юсер.

export default function App() {
  // id замовлення, відкритого в «Деталях», або null. У історію не входить:
  // «Скасувати дію» не закриває й не відкриває «Деталі».

  return (
    <StopListProvider>
      <QueueProvider>
        <div className="app">
          <header className="app-header">
            <h1>Черга замовлень</h1>
            <p className="lead">
              Нове замовлення приймають у формі, а далі воно йде колонками зліва
              направо.
            </p>
            <StopList />
          </header>
          <div className="workspace">
            <OrderComposer />
            <QueuePanel />
          </div>
        </div>
      </QueueProvider>
    </StopListProvider>
  )
}

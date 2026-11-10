import { useState } from 'react'

const MIN = 1
const MAX = 8

export default function GuestsStepper({ defaultValue }) {
  const [guests, setGuests] = useState(defaultValue)

  function handleDecrement() {
    setGuests((g) => Math.max(MIN, g - 1))
  }

  function handleIncrement() {
    setGuests((g) => Math.min(MAX, g + 1))
  }
  return (
    <fieldset className="stepper">
      <legend>Гості</legend>
      <div className="stepper-controls">
        <button
          aria-label="Менше гостей"
          type="button"
          aria-disabled={guests === MIN}
          onClick={handleDecrement}
        >
          −
        </button>
        <output>{guests}</output>
        <button
          aria-label="Більше гостей"
          type="button"
          aria-disabled={guests === MAX}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <input type="hidden" name="guests" value={guests.toString()} />
    </fieldset>
  )
}

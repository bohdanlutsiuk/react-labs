const MIN = 1
const MAX = 8

export default function GuestsStepper({ value, onChange }) {
  function handleDecrement() {
    onChange(Math.max(MIN, value - 1))
  }

  function handleIncrement() {
    onChange(Math.min(MAX, value + 1))
  }

  return (
    <fieldset className="stepper">
      <legend>Гості</legend>
      <div className="stepper-controls">
        <button
          aria-label="Менше гостей"
          type="button"
          aria-disabled={value === MIN}
          onClick={handleDecrement}
        >
          −
        </button>
        <output>{value}</output>
        <button
          aria-label="Більше гостей"
          type="button"
          aria-disabled={value === MAX}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <input type="hidden" name="guests" value={value.toString()} />
    </fieldset>
  )
}

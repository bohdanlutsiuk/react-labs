import TimerView from './TimerView.jsx'
import { useCountdown } from '../hooks/useCountdown.js'

export default function BrewTimer({ method }) {
  const { secondsLeft, isRunning, start, pause, reset } = useCountdown(
    method.seconds,
  )

  let status = 'paused'
  if (isRunning) status = 'running'
  else if (secondsLeft <= 1) status = 'done'
  else if (secondsLeft === method.seconds) status = 'idle'

  return (
    <TimerView
      method={method}
      secondsLeft={secondsLeft}
      status={status}
      onStart={start}
      onPause={pause}
      onReset={reset}
    />
  )
}

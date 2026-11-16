import { useEffect, useState } from 'react'
import TimerView from './TimerView.jsx'

export default function BrewTimer({ method }) {
  const [secondsLeft, setSecondsLeft] = useState(method.seconds)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (status !== 'running') return

    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 1) {
          setStatus('done')
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [status])

  const handleStart = () => {
    setStatus('running')
  }
  const handlePause = () => setStatus('paused')
  const handleReset = () => {
    setStatus('idle')
    setSecondsLeft(method.seconds)
  }

  return (
    <TimerView
      method={method}
      secondsLeft={secondsLeft}
      status={status}
      onStart={handleStart}
      onPause={handlePause}
      onReset={handleReset}
    />
  )
}

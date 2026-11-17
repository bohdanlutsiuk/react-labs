import { useEffect, useState } from 'react'

/**
 * Зворотний відлік від `totalSeconds` до нуля, по секунді.
 *
 * Використання:
 *   const { secondsLeft, isRunning, start, pause, reset } = useCountdown(180)
 *
 * Вимоги — у тестах tests/useCountdown.test.jsx.
 */
export function useCountdown(totalSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])

  function start() {
    setIsRunning(true)
  }
  function pause() {
    setIsRunning(false)
  }
  function reset() {
    setIsRunning(false)
    setSecondsLeft(totalSeconds)
  }

  return { secondsLeft, isRunning, start, pause, reset }
}

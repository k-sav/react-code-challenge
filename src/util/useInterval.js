import {useEffect, useRef} from 'react'

function useInterval(callback, delay, cleanup) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      tick()
      let id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
        if (cleanup) {
          cleanup()
        }
      }
    }
  }, [delay, cleanup])
}

export default useInterval

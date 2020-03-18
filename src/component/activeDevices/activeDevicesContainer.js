import React, {useState, useCallback} from 'react'
import ActiveDevices from './activeDevicesComponent'
import useInterval from 'util/useInterval'
import fetchDevices, {controller} from 'util/devices'

const INTERVAL = 5000

const Container = () => {
  const [devices, setDevices] = useState([])

  const ControllerAbortCallback = useCallback(() => {
    return controller.abort
  }, [])

  useInterval(
    async () => {
      const {devices} = await fetchDevices()
      if (devices) {
        setDevices(devices)
      }
    },
    INTERVAL,
    ControllerAbortCallback,
  )

  return <ActiveDevices devices={devices} interval={INTERVAL}></ActiveDevices>
}

export default Container

import React, {useState} from 'react'
import ActiveDevices from './activeDevicesComponent'
import useInterval from 'util/useInterval'
import fetchDevices from 'util/devices'

const INTERVAL = 5000

const Container = () => {
  const [devices, setDevices] = useState([])

  useInterval(async () => {
    const {devices} = await fetchDevices()
    setDevices(devices)
  }, INTERVAL)

  return <ActiveDevices devices={devices} interval={INTERVAL}></ActiveDevices>
}

export default Container

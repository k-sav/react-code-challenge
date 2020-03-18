import React, {useState, useEffect} from 'react'
import ActiveDevices from './activeDevicesComponent'

const INTERVAL = 5000
const mockDevices = [
  {
    id: 0,
    name: 'Karyl',
  },
  {
    id: 1,
    name: 'Filia',
  },
  {
    id: 2,
    name: 'Coleen',
  },
]

const Container = () => {
  const [devices, setDevices] = useState([])

  useEffect(() => setDevices(mockDevices), [])

  return <ActiveDevices devices={devices} interval={INTERVAL}></ActiveDevices>
}

export default Container

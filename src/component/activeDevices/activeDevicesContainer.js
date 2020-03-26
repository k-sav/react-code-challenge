import React, {useContext} from 'react'
import ActiveDevices from './activeDevicesComponent'
import {AuthContext} from 'util/auth'

const INTERVAL = 5000

const Container = () => {
  const {xAuthState} = useContext(AuthContext)
  const {devices} = xAuthState.context

  return <ActiveDevices devices={devices} interval={INTERVAL}></ActiveDevices>
}

export default Container

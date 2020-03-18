import React, {useContext} from 'react'
import {AuthContext} from '../util/auth'

import AuthenticatedApp from './authenticated'
import UnauthenticatedApp from './unauthenticated'

const ScreenHome = () => {
  const {xAuthState} = useContext(AuthContext)

  return xAuthState.value === 'authorized' ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  )
}

export default ScreenHome

import React from 'react'

import {useAuthState} from 'util/auth'
import AuthenticatedApp from './authenticated'
import UnauthenticatedApp from './unauthenticated'

function ScreenHome() {
  const {isAuthenticated} = useAuthState()
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default ScreenHome

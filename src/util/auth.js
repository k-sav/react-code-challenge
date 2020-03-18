import React from 'react'
import {storedUser, removeUser} from './user'

const AuthContext = React.createContext()
function AuthProvider({children}) {
  const [state, setState] = React.useState({
    status: 'success',
    error: null,
    user: storedUser(),
  })

  React.useEffect(() => {
    if (!state.user) {
      removeUser()
    }
  }, [state])

  return (
    <AuthContext.Provider value={{state, setState}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuthState() {
  const {state} = React.useContext(AuthContext)
  const isPending = state.status === 'pending'
  const isError = state.status === 'error'
  const isSuccess = state.status === 'success'
  const isAuthenticated = state.user && isSuccess
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  }
}

export {AuthProvider, useAuthState, AuthContext}

import React from 'react'
import {State} from 'xstate'
import {useMachine} from '@xstate/react'

import authMachine from 'util/authStateMachine'

// Check localstorage for a saved state
// then if it exists, create a state we can initialise with
const stateDefinition = JSON.parse(localStorage.getItem('stored-state'))
let previousState = null
if (stateDefinition) {
  previousState = State.create(stateDefinition)
  console.log(previousState)
}

const AuthContext = React.createContext()

function AuthProvider({children}) {
  const [xAuthState, sendEvent, service] = useMachine(authMachine, {
    state: previousState,
  })

  // Persist state to locastorage when we:
  // - have transitioned to an 'authorized' state
  // - send the 'LOGOUT' event

  service.onTransition((state, event) => {
    if (state.matches('authorized') || event.type === 'LOGOUT')
      try {
        localStorage.setItem('stored-state', JSON.stringify(state))
      } catch (e) {
        console.error('Unable to save to localStorage')
      }
  })

  return (
    <AuthContext.Provider value={{xAuthState, sendEvent}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, AuthContext}

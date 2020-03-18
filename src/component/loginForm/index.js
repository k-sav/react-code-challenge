/** @jsx jsx */
import {useContext} from 'react'
import {jsx} from '@emotion/core'

import TextField from 'ui/textField'
import Button from 'ui/button'
import {AuthContext} from 'util/auth'

import {validEmail} from 'util/validation'

import style from './style'

function LoginForm() {
  const {xAuthState, sendEvent} = useContext(AuthContext)

  const setEmail = value => {
    sendEvent({
      type: 'SET_EMAIL',
      value,
    })
  }

  const setPassword = value => {
    sendEvent({
      type: 'SET_PASSWORD',
      value,
    })
  }

  const onSubmit = async e => {
    e.preventDefault()
    sendEvent({
      type: 'LOGIN',
    })
  }

  return (
    <div css={style}>
      <form onSubmit={onSubmit}>
        <h1>Login </h1>
        <h2>{xAuthState.value}</h2>
        <TextField
          type="email"
          label="Email"
          value={xAuthState.context.email}
          set={setEmail}
        />
        <TextField
          type="password"
          label="Password"
          value={xAuthState.context.password}
          set={setPassword}
        />
        <div
          hidden={!xAuthState.context.errorMessage}
          className="feedback"
          aria-live="assertive"
        >
          {xAuthState.context.errorMessage}
        </div>
        <Button
          version="primary"
          disabled={
            xAuthState.current === 'loading' ||
            !xAuthState.context.email ||
            !xAuthState.context.password ||
            !validEmail(xAuthState.context.email)
          }
        >
          Login {xAuthState.current === 'loading' ? '...' : ''}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm

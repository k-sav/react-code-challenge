/** @jsx jsx */
import React, {useState} from 'react'
import {jsx} from '@emotion/core'

import TextField from 'ui/textField'
import Button from 'ui/button'
import {AuthContext, useAuthState} from 'util/auth'
import {fetchUser, setUser} from 'util/user'
import {validEmail} from '../../util/validation'

import style from './style'

function LoginForm() {
  const {state, setState} = React.useContext(AuthContext)
  const {isPending, isError, error} = useAuthState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    setState({...state, status: 'pending'})
    const req = await fetchUser(email, password)
    if (req.status === 'error') {
      const {message} = req
      setState({...state, status: 'error', error: message})
    } else {
      const {user} = req
      setState({...state, user, status: 'success', error: null})
      setUser(user)
    }
  }

  return (
    <div css={style}>
      <form onSubmit={onSubmit}>
        <h1>Login </h1>
        <TextField type="email" label="Email" value={email} set={setEmail} />
        <TextField
          type="password"
          label="Password"
          value={password}
          set={setPassword}
        />
        <div hidden={!isError} className="feedback" aria-live="assertive">
          {error}
        </div>
        <Button
          version="primary"
          disabled={isPending || !email || !password || !validEmail(email)}
        >
          Login {isPending ? '...' : ''}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm

/** @jsx jsx */
import React, {useState} from 'react'
import {jsx} from '@emotion/core'

import TextField from 'ui/textField'
import Button from 'ui/button'
import {validEmail} from 'util/validation'

import style from './style'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
  }

  return (
    <div css={style}>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <TextField type="email" label="Email" value={email} set={setEmail} />
        <TextField
          type="password"
          label="Password"
          value={password}
          set={setPassword}
        />
        <Button
          version="primary"
          disabled={!email || !password || !validEmail(email)}
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm

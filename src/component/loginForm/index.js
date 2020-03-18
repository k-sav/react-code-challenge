import React, {useState} from 'react'

import TextField from 'ui/textField'
import Button from 'ui/button'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <TextField type="email" label="Email" value={email} set={setEmail} />
        <TextField
          type="password"
          label="Password"
          value={password}
          set={setPassword}
        />
        <Button version="primary">Login</Button>
      </form>
    </div>
  )
}

export default LoginForm
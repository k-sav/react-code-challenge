import React from 'react'

import {ThemeProvider} from 'emotion-theming'
import theme from './util/theme'

import LoginForm from 'component/loginForm'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginForm />
    </ThemeProvider>
  )
}

export default App

import React from 'react'

import {AuthProvider} from './util/auth'
import {ThemeProvider} from 'emotion-theming'
import theme from './util/theme'

import Home from 'screen/home'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App

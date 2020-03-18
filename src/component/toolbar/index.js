/** @jsx jsx */
import React from 'react'
import {jsx} from '@emotion/core'

import Button from 'ui/button'
import {AuthContext} from 'util/auth'

import ToolbarStyle from './style'

function Toolbar() {
  // eslint-disable-next-line no-unused-vars
  const {state, _setState} = React.useContext(AuthContext)

  const notify = payload => {
    console.log(payload)
  }

  const logout = payload => {
    console.log('logout')
  }

  return (
    <div css={ToolbarStyle}>
      <Button version="secondary" onClick={() => notify(state.user)}>
        Notify
      </Button>
      <Button version="tertiary" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  )
}

export default Toolbar

/** @jsx jsx */
import React from 'react'
import {jsx} from '@emotion/core'

import Button from 'ui/button'
import {AuthContext} from 'util/auth'

import ToolbarStyle from './style'

function Toolbar() {
  const {state, setState} = React.useContext(AuthContext)

  const notify = payload => {
    console.log(payload)
  }

  return (
    <div css={ToolbarStyle}>
      <Button version="secondary" onClick={() => notify(state.user)}>
        Notify
      </Button>
      <Button
        version="tertiary"
        onClick={() => setState({...state, user: null})}
      >
        Logout
      </Button>
    </div>
  )
}

export default Toolbar

/** @jsx jsx */
import React from 'react'
import {jsx} from '@emotion/core'

import Button from 'ui/button'
import {AuthContext} from 'util/auth'
import notify from 'util/notify'

import ToolbarStyle from './style'

function Toolbar() {
  const {state, setState} = React.useContext(AuthContext)

  const notifyClickhandler = payload => {
    notify(state.user).then(res => console.log(res))
  }

  return (
    <div css={ToolbarStyle}>
      <Button
        version="secondary"
        onClick={() => notifyClickhandler(state.user)}
      >
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

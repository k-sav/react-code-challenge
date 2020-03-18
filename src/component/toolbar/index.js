/** @jsx jsx */
import {useContext, useState} from 'react'
import {jsx} from '@emotion/core'

import Button from 'ui/button'
import {AuthContext} from 'util/auth'
import notify from 'util/notify'

import ToolbarStyle from './style'

function Toolbar() {
  const [isNotifyPending, setNotifyPending] = useState(false)
  const {xAuthState, sendEvent} = useContext(AuthContext)

  const notifyClickhandler = payload => {
    setNotifyPending(true)
    notify(payload).then(res => {
      console.log(res)
      setNotifyPending(false)
    })
  }

  return (
    <div css={ToolbarStyle}>
      <Button
        version="secondary"
        onClick={() => notifyClickhandler(xAuthState.context.user)}
        disabled={isNotifyPending}
      >
        Notify {isNotifyPending ? '...' : ''}
      </Button>
      <Button version="tertiary" onClick={() => sendEvent({type: 'LOGOUT'})}>
        Logout
      </Button>
    </div>
  )
}

export default Toolbar

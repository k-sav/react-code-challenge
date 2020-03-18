/** @jsx jsx */
import {useContext, useState} from 'react'
import {jsx} from '@emotion/core'

import Button from 'ui/button'
import {AuthContext} from 'util/auth'
import notify from 'util/notify'

import ToolbarStyle from './style'

function Toolbar() {
  const {state, setState} = useContext(AuthContext)
  const [isNotifyPending, setNotifyPending] = useState(false)

  const notifyClickhandler = payload => {
    setNotifyPending(true)
    notify(state.user).then(res => {
      console.log(res)
      setNotifyPending(false)
    })
  }

  return (
    <div css={ToolbarStyle}>
      <Button
        version="secondary"
        onClick={() => notifyClickhandler(state.user)}
        disabled={isNotifyPending}
      >
        Notify {isNotifyPending ? '...' : ''}
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

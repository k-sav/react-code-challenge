/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState} from 'react'
import PropTypes from 'prop-types'
import {useTheme} from 'emotion-theming'
import {darken} from 'polished'

import style from './style'

function TextField({type, label, value, set}) {
  const [focussed, setFocussed] = useState(false)
  const theme = useTheme()

  return (
    <label
      htmlFor={`${label.replace(' ', '').toLowerCase()}Input`}
      css={style}
      style={
        focussed
          ? {
              outline: `2px solid ${darken(
                0.3,
                theme.colors.backgrounds.field,
              )}`,
            }
          : {}
      }
    >
      <span className={`labelText ${focussed || value ? 'sr-only' : ''}`}>
        {label}
      </span>
      <input
        id={`${label.replace(' ', '').toLowerCase()}Input`}
        type={type}
        value={value}
        onChange={e => set(e.target.value)}
        onFocus={e => setFocussed(true)}
        onBlur={e => setFocussed(false)}
      />
    </label>
  )
}

export default TextField

TextField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
}

TextField.defaultProps = {
  type: 'text',
  label: 'Email',
}

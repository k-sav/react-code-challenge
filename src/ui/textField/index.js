import React, {useState} from 'react'
import PropTypes from 'prop-types'

const TextField = ({type, label, value, set}) => {
  const [focussed, setFocussed] = useState(false)

  return (
    <label htmlFor={`${label.replace(' ', '').toLowerCase()}Input`}>
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

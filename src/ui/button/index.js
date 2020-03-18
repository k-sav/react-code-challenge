import styled from '@emotion/styled'
import {darken} from 'polished'

const Button = styled.button`
  display: block;
  font-family: sans-serif;
  background: ${props => props.theme.colors.buttons[props.version].bg};
  color: ${props => props.theme.colors.buttons[props.version].fg};
  text-transform: uppercase;
  padding: 1em 2em;
  border-radius: 4px;
  border: 0 none;
  outline-offset: 2px;

  &:not(:disabled) {
    &:hover,
    &:focus {
      background: ${props =>
        darken(0.1, props.theme.colors.buttons[props.version].bg)};
    }

    &:focus {
      outline: 2px solid
        ${props => darken(0.1, props.theme.colors.buttons[props.version].bg)};
    }
  }

  &:disabled {
    background: ${props => props.theme.colors.buttons.disabled.bg};
    color: ${props => props.theme.colors.buttons.disabled.fg};
  }
`

export default Button

Button.defaultProps = {
  version: 'primary',
}

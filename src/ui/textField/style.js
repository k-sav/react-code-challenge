import {css} from '@emotion/core'

const textFieldStyles = ({colors}) => css`
  display: block;
  background: ${colors.backgrounds.field};
  padding: 0.5em;
  position: relative;
  outline-offset: -2px;

  .labelText {
    position: absolute;
    color: ${colors.backgrounds.login};
  }

  input {
    background: ${colors.backgrounds.field};
    border: 0 none;
    color: ${colors.backgrounds.login};
    font-family: sans-serif;
    font-size: 1em;

    &:focus {
      outline: none;
    }
  }
`
export default textFieldStyles

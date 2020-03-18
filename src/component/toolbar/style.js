import {css} from '@emotion/core'

const ToolbarStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;

  * + * {
    margin-left: 1rem;
  }
`

export default ToolbarStyle

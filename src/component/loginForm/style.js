import {css} from '@emotion/core'

const formStyles = ({colors}) => css`
  background: ${colors.backgrounds.login};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 300;
  }

  form {
    background: ${colors.backgrounds.loginForm};
    padding: 20px;
    border-radius: 4px;
    width: 12em;
  }

  label {
    margin-bottom: 0.3em;
  }

  label + label {
    margin-top: 0.5rem;
  }

  button {
    margin: 0 auto;
    margin-top: 1rem;
  }

  .feedback {
    color: red;
    padding-top: 0.5rem;
  }
`

export default formStyles

import {css} from '@emotion/core'

const style = ({colors, interval}) => {
  return css`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    background: ${colors.backgrounds.devices};
    color: white;
    overflow: hidden;

    h1 {
      max-width: 120px;
      text-align: center;
      font-weight: normal;
      text-transform: uppercase;
      font-size: 1rem;

      span {
        font-size: 2rem;
        display: block;
      }
    }

    .outer {
      max-width: 400px;
      height: 400px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }

    .devices {
      position: absolute;
      padding: 0;
      margin: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: mySpin ${2 * interval}ms linear infinite;
    }

    .device {
      list-style: none;
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .deviceCircle {
      background: white;
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      transform: translate(25px, 25px);
    }

    @keyframes mySpin {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
}

export default style

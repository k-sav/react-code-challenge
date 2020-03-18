/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useTheme} from 'emotion-theming'

import style from './style'

function ActiveDevices({devices = [], interval = 5000}) {
  const theme = useTheme()
  const {length: numDevices} = devices

  return (
    <div css={style({...theme, interval})}>
      <div className="outer">
        <h1>
          <span>{numDevices}</span> Devices online
        </h1>
        <ul className="devices">
          {devices.map((device, i) => (
            <li
              className="device"
              key={device.id}
              style={getInitalRotationValue(i, numDevices)}
            >
              <span className="deviceCircle">
                <span className="sr-only">{device.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function getInitalRotationValue(i, total) {
  return {transform: `rotate(${(i / total) * 360}deg)`}
}

export default ActiveDevices

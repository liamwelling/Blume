import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 429 442"
      xmlSpace="preserve"
      enableBackground="new 0 0 429 442"
      {...props}
    >
      <G id="Icon" transform="translate(0 -.273)">
        <Path
          id="Background"
          d="M214.5 27.3c107.1 0 194 86.8 194 194s-86.8 194-194 194-194-86.8-194-194 86.9-194 194-194z"
          fill="#fff"
        />
        <Path
          id="_"
          d="M202.4 294v-60.6h-60.6v-24.2h60.6v-60.6h24.2v60.6h60.6v24.2h-60.6V294h-24.2z"
          fill="#2436e7"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent

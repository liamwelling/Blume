import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 429 442"
      xmlSpace="preserve"
      enableBackground="new 0 0 429 442"
      {...props}
    >
      <Path d="M190 364.5c-5 0-10-1.9-13.8-5.7l-153-153c-7.6-7.6-7.6-20 0-27.6l153-153c7.6-7.6 20-7.6 27.6 0 7.6 7.6 7.6 20 0 27.6L64.6 192l139.2 139.2c7.6 7.6 7.6 20 0 27.6-3.8 3.8-8.8 5.7-13.8 5.7z" />
    </Svg>
  )
}

export default SvgComponent

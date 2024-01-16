import * as React from "react"
import Svg, { Path, G, LinearGradient, Stop, ClipPath, Use, Defs, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-Svg: style */

function SvgComponent(props) {
  return (
    <Svg 
    id="Layer_1" 
    xmlns="http://www.w3.org/2000/Svg" 
    x="0px"
    y="0px"
	 viewBox="0 0 502 503" 
   style="enable-background:new 0 0 502 503;" 
   xmlSpace="preserve">

<G>
	<Defs>
		<Rect id="SvgID_1_" x="20" y="23.8" width="458.5" height="458.5"/>
	</Defs>
	<ClipPath id="SvgID_00000146484549061704138110000008874106437659228321_">
	</ClipPath>
	<G id="Group_221" style="clip-path:url(#SvgID_00000146484549061704138110000008874106437659228321_);">
		<Path id="Path_809" class="st1" d="M104.4,430.8c98.1,80,242.5,65.3,322.5-32.8s65.3-242.5-32.8-322.5S151.6,10.1,71.6,108.2
			C38.2,149.1,20,200.3,20,253.1C20,322,51,387.2,104.4,430.8 M249.2,44.8c115,0,208.3,93.3,208.3,208.3
			c0,60.4-26.2,117.8-71.8,157.3c-10.8-48-67.8-84.5-136.5-84.5s-125.7,36.6-136.5,84.5C25.9,335,16.5,203.5,91.9,116.6
			C131.5,71,188.9,44.8,249.2,44.8"/>
		<Path id="Path_810" class="st1" d="M214.1,299.1c40,19.4,88.2,2.8,107.6-37.2c19.4-40,2.8-88.2-37.2-107.6
			c-40-19.4-88.2-2.8-107.6,37.2c-5.3,11-8.1,23-8.1,35.2C168.6,257.5,186.3,285.7,214.1,299.1"/>
	</G>
</G>
</Svg>

  )
}

export default SvgComponent

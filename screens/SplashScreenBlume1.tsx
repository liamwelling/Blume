import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import SvgXml from '../assets/SVG/MainLogo'

const SplashScreenBlume1 = () => {
  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', backgroundColor: 'white'}}>
       <SvgXml height={500} width={700} /> 
    </View>
  )
}
const styles = StyleSheet.create({
 
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
 
});

export default SplashScreenBlume1
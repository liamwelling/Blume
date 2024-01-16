import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import SvgXml from '../assets/SVG/MainLogo'
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreenBlume = () => {
  return (
 <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                      <LinearGradient
        // Background Linear Gradient
        colors={['#56BFE8', '#FFFFFF','#FFFFFF','#56BFE8']}
        style={styles.background}
      />
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

export default SplashScreenBlume
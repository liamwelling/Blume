import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const StockCard1 = (props: any) => {



  const [loadedFonts] = useFonts({
    Regular: require("../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../assets/fonts/Graphik-Medium-Web.ttf')
  });


if (!loadedFonts) {
    return <AppLoading />;
}
  return (
    <View style={styles.stockCardContainer}>
      {/* <View>
        <View style={styles.stockLogo}></View>
        
      </View> */}
      
      <View style={styles.stockTextContainer}>
       <Text style={styles.stockName}>{props.name}</Text>
       <Text style={styles.stockTicker}>{props.ticker}</Text>
       
       
      </View>
      <View style={styles.stockTextContainerRight}>
       <Text style={styles.stockPrice}>${props.price}</Text>
       <Text style={styles.stockPercent}><Text style={ props.todaysChange > 0 ? { color:'green'} : {color : 'red'} }>${props.todaysChange?.toFixed(2)} ({props.todaysChangePerc?.toFixed(2)})%</Text></Text>
       
       
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  stockLogo: {
    width: 57,
    height: 57,
    borderRadius: 30,
    backgroundColor: 'blue',
    
    marginLeft: 12,
    marginRight: 15,
  },
  stockName: {
    fontFamily: 'Regular',
    fontSize: 16,
    marginBottom: 14
  },
  stockPercent: {
    fontFamily: 'Medium',
    fontSize: 14,
    textAlign: 'right'
  },
  stockTicker: {
    fontFamily: 'Regular',
    fontSize: 14
  },
  stockPrice: {
    fontFamily: 'Medium',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 14
  },
  stockTextContainer: {
    height: 50,
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'

  },
  stockTextContainerRight: {
     height: 50,
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'space-evenly',
     textAlign: 'right',
     marginLeft: 'auto',
     marginRight: 14
  
    },
  stockCardContainer: {
    // marginTop: 20,
    width: 360,
    height: 85,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
    marginBottom: 20
 
  }
  
});

export default StockCard1
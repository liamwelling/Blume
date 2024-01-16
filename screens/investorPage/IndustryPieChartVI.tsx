import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { VictoryPie } from 'victory-native'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import FontPath from '../../assets/fonts/FontPath';
// interface Props {
//   currentInvestor: string;

// }
const IndustryPieChartVI = ({currentInvestor, chartData}: any) => {
  
  // const donutData = currentInvestor.map((investor:any) => investor.stocks.map((stock: any) => (
  //   { x: stock.industry, y: stock.percentage }
  //   )));

  // const chartData = Array.from(donutData[0].reduce(
  //     (m: any, {x, y}: any) => m.set(x, (m.get(x) || 0) + y), new Map
  //   ), ([x, y]) => ({x, y}));


  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf'),
    Semibold: require('../../assets/fonts/Graphik-Semibold-Web.ttf')    
});
if (!loadedFonts) {
    return <AppLoading />;
}  
  return (
    <View style={{ display: 'flex',justifyContent:'center', alignItems:'center', marginBottom: 200}}>
     {/* <Text onPress={() => console.log(chartData)}>print</Text> */}
       {/* <VictoryPie
      labels={() => null}
  data={chartData}
  style={{
    data: { fill: ({ datum }) => 
      datum.x == 'Consumer Staples' ? '#00994c' 
    : datum.x == 'ETF' ? '#2e3192' 
    : datum.x == 'Information Technology' ? '#7184f4' 
    : datum.x == 'Financials' ? '#7cf473' 
    : datum.x == 'Energy' ? '#9e7eff' 
    : datum.x == 'Crypto' ? '#b3aecc' 
    : datum.x == 'Healthcare' ? '#a7d6a3' 
    : datum.x == 'Consumer Discresionary' ? '#da1c5c' 
    : datum.x == 'Materials' ? '#ed8700' 
    : datum.x == 'Utilities' ? '#f9ed32' 
    : datum.x == 'Real Estate' ? '#ef84ad' 
    : datum.x == 'REIT' ? '#bce0ed' 
    : datum.x == 'Communication Services' ? '#27aae1' 
    : datum.x == 'Industrials' ? '#6a8482' 
    : 'grey'    
    }
  }}
  innerRadius={125}
  width={400}

/>    */}

{/* {currentInvestor.map((investor: any, index: any) => (
<View style={styles.innerContainer}>
  <Text style={styles.riskLittleText}>Risk</Text>
  <Text style={styles.riskBigText}>{investor.risk}</Text>
</View>
))} */}
    </View>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    width: 230,
    height: 230,
    borderColor: '#E3E3E3',
    borderRadius: 230,
    borderWidth: 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: -310
  
  },
  riskLittleText: {
    fontFamily: 'Medium',
    fontSize: 18
  },
  riskBigText: {
    fontFamily: 'Semibold',
    fontSize: 100
  }
});

export default IndustryPieChartVI
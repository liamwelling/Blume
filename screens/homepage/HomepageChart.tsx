import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import axios from 'axios';
import { EXPO_PUBLIC_SERVER_URL } from '@env';
import { err } from 'react-native-svg/lib/typescript/xml';

const HomepageChart = () => {


  // calls investor average ROI
  const [loading, setLoading] = useState(true)
  const [investorChartData, setInvestorChartData] = useState([0,0])
  const [marketChartData, setMarketChartData] = useState([0,0])

  const investorData = async () => {
    axios.get(EXPO_PUBLIC_SERVER_URL + `/homepage_chart/`).then(
      (response) => {
        setInvestorChartData(response.data.investors.map((i:any) => { return {x: i.date, y: i.ROI}}))
        setMarketChartData(response.data.market.priceHistory[0].quotes.map((i: any) => {return{close: i.close, time: i.timestamp}}));
        // console.log(response.data);
        setLoading(false)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  const chartData = marketChartData.map((i:any) => i.close);




  useEffect(() => {
    investorData()
  },[])
  const uniqHistory  = investorChartData.filter((value: any, index, self) =>
  index === self.findIndex((t: any) => (
    t.x === value.x && t.y === value.y
  ))
)
  const historicalChartData = Array.from(uniqHistory.reduce(
    (m: any, {x, y}: any) => m.set(x, (m.get(x) || 0) + y), new Map
  ), ([x, y]: any) => ({x, y}));
  // const historicalChartData = investorChartData.map((i:any) => i.y)
  

  
  const chartWidth = Dimensions.get("window").width;
  const [data] =  useState([1,1])

  return (
    <View >
      
      {/* <VictoryChart width={chartWidth}> */}
      {/* <Text onPress={() => {console.log(chartData)}}>test</Text> */}
      
      <View style={{height: 260, backgroundColor: '#2436E7', justifyContent:'center'}}>

      {loading?
        <View style={{backgroundColor: '#2436E7', height: 250, width: chartWidth}}>
        </View>
      :
      <>
      <VictoryLine
        height={250}
        width={chartWidth}
        padding={0}
        style={{
          data: { stroke: "white" },
          parent: { border: "1px solid #ccc"}
        }}
        data={historicalChartData.length > 0 ? historicalChartData : data }

        
      />
  
      <View style={{marginTop: -250}}>
      <VictoryLine
        height={250}
        width={chartWidth}
        padding={0}
        style={{
          data: { stroke: "#8DC63FEB" },
          parent: { border: "1px solid #ccc", boxShadow: 1}
        }}
        data={chartData.length > 4 ? chartData : data}
      />

      </View> 
      </>
}
    </View>
  
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  }
});


export default HomepageChart
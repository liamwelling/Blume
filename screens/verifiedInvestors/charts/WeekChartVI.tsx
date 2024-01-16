import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

const WeekChartVI = () => {
  const chartWidth = Dimensions.get("window").width;
  const [data] =  useState([4446.59,
    4397.45,
    4412.53,
    4488.28,
    4500.21,
    4481.15,
    4525.12,
    4582.64,
    4545.86,
    4530.41,
    4602.45,
    4631.6,
    4575.52,
    4543.06,
    4520.16,
    4456.24,
    4511.61,
    4461.18,
    4463.12,
    4411.67,
    4357.86,
    4262.45,
    4173.11])

    const [data2] =  useState([4446.59,
      4497.45,
      4012.53,
      4588.28,
      4600.21,
      4581.15,
      4625.12,
      4382.64,
      4645.86,
      4630.41,
      4702.45,
      4731.6,
      4675.52,
      4243.06,
      4620.16,
      4556.24,
      4611.61,
      4561.18,
      4563.12,
      4511.67,
      4457.86,
      4962.45,
      4373.11])
  return (
    <View>
      
      {/* <VictoryChart width={chartWidth}> */}
      <View style={{height: 260, backgroundColor: 'white', justifyContent:'center'}}>
        
      <VictoryLine
        height={250}
        width={chartWidth}
        padding={0}
        style={{
          data: { stroke: "#2436E7" },
          parent: { border: "1px solid #ccc"}
        }}
        data={data}
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
        data={data2}
      />

      </View>
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


export default WeekChartVI
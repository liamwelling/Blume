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
import moment from 'moment';
import axios from 'axios'
import useStockStore from '../../../stateManagement/StockContext';
import { EXPO_PUBLIC_SERVER_URL } from '@env';

const DayChartVI = () => {
  const chartWidth = Dimensions.get("window").width;
  const store = useStockStore();
  const selectedTicker = store.stockTicker
  const selectedType = store.stockType
  const [dayData, setDayData] = useState([])
  const todaysDate = moment('YYYY.MM.DD').unix();
  const unixTime = new Date(todaysDate).valueOf()
  var d = moment().subtract(4,'d').format('YYYY-MM-DD');
  const datee = new Date(d).valueOf();

  const getStockData = async () => {
    const rangeDay = 'day';
    axios.get(EXPO_PUBLIC_SERVER_URL + `/stock/stock_history/`, {
      method: "GET",
      headers: {
        range: rangeDay,
        ticker: selectedTicker,   
        type:  selectedType  

      },
    }).then((response: any) => {
      // console.log(response.data)
       setDayData(response.data.priceHistory[0].quotes.map((i: any) => {return{close: i.close, time: i.timestamp}}));
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getStockData()
  }, []);
  
  // setDayChartData(dayData.map((i:any) => i.c));
  const dayChartData = dayData.map((i:any) => i.close);
  // const chartData = {(dayChartData.length > 0?)}
  const [data] =  useState([
    1,1])


  return (
    <View>
   
      {/* <VictoryChart width={chartWidth}> */}
      <View style={{height: 260, backgroundColor: 'white', justifyContent:'center'}}>
       
      <VictoryLine
        height={250}
        width={chartWidth}
        padding={0}
        style={{
          data: { stroke: "#8DC63FEB" },
          parent: { border: "1px solid #ccc"}
        }}
        data={dayChartData.length > 0? dayChartData : data}
      />
  
      
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


export default DayChartVI
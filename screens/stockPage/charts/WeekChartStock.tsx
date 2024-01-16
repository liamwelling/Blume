import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import axios from 'axios'
import moment from 'moment';
import useStockStore from '../../../stateManagement/StockContext';
import { EXPO_PUBLIC_SERVER_URL } from '@env';

const WeekChartVI = () => {
  const chartWidth = Dimensions.get("window").width;

  const [weekData, setWeekData] = useState([])
  const store = useStockStore();
  const selectedTicker = store.stockTicker
  const selectedType = store.stockType
  const week = moment().subtract(7,'d').format('YYYY-MM-DD');
  const date = new Date(week).valueOf();

  // const todaysDate = moment().format("YYYY-MM-DD");
  // const weekRange = moment().subtract(8, 'days').format("YYYY-MM-DD")
  
  const getStockData = async () => {
    const rangeDay = 'week';
    axios.get(EXPO_PUBLIC_SERVER_URL + `/stock/stock_history/`, {
      method: "GET",
      headers: {
        range: rangeDay,
        ticker: selectedTicker,   
        type:  selectedType  

      },
    }).then((response: any) => {
      // console.log(response.data.priceHistory[0].quotes.map((i: any) => {return{close: i.close, time: i.timestamp}}))
       setWeekData(response.data.priceHistory[0].quotes.map((i: any) => {return{close: i.close, time: i.timestamp}}));
    })
  }

  
  // useEffect(() => {
    
  //   axios
  //     .get(`https://api.polygon.io/v2/aggs/ticker/${selectedTicker}/range/3/minute/${weekRange}/${todaysDate}?adjusted=true&sort=asc&limit=120&apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`)
  //     .then(response => 
  //      { 
  //       //  console.log(response.data.results);
  //       // setDayOpenData(Object.values(response.data.data.items).map((v) => (v.open)));
  //       setWeekData(response.data.results);
  //       }
        
  //       );
  // }, []);
  useEffect(() => {
    getStockData()
  }, []);
  const weekChartData = weekData.map((i:any) => i.close);
  const [data] =  useState([1,1])


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
        data={weekChartData.length > 0? weekChartData : data}
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


export default WeekChartVI